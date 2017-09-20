import ElevationService from '../services/ElevationService';
import DirectionsService from '../services/DirectionsService';
import FileService from '../services/FileService';
import GpxService from '../services/GpxService';
import Firebase from '../services/Firebase/Database';
import { getBounds } from '../services/GeometryService';
import {
  addDistanceToTrack,
  addDistanceToElevation
} from '../services/GeometryService';
import { hideModal, setMapCentre } from './settings';
import { history } from '../routes';

const firebase = new Firebase();

export const ADD_POINT = 'ADD_POINT';
export const addPoint = ({ lat, lon }) => {
  return {
    type: ADD_POINT,
    payload: { lat, lon }
  };
}

export const REMOVE_POINT = 'REMOVE_POINT';
export const removePoint = point => dispatch => {
  dispatch({
    type: REMOVE_POINT,
    payload: point
  });
  dispatch(updateDistance());
  dispatch(updateAscent());   // Join these two
}

export const CLEAR_ROUTE = 'CLEAR_ROUTE';
export const clearRoute = () => {
  return {
    type: CLEAR_ROUTE
  };
}

export const SET_ROUTE = 'SET_ROUTE';
export const setRoute = route => {
  return {
    type: SET_ROUTE,
    payload: route
  };
}

export const ADD_TRACK = 'ADD_TRACK';
export const addTrack = track => {
  return {
    type: ADD_TRACK,
    payload: track
  };
}

export const UPDATE_TRACK = 'UPDATE_TRACK';
export const updateTrack = track => {
  return {
    type: UPDATE_TRACK,
    payload: track
  };
}

export const UPDATE_DISTANCE = 'UPDATE_DISTANCE';
export const updateDistance = () => {
  return {
    type: UPDATE_DISTANCE
  };
}

export const UPDATE_ASCENT = 'UPDATE_ASCENT';
export const updateAscent = () => {
  return {
    type: UPDATE_ASCENT
  };
}

export const TOGGLE_FOLLOWS_ROADS = 'TOGGLE_FOLLOWS_ROADS';
export const toggleFollowsRoads = () => {
  return {
    type: TOGGLE_FOLLOWS_ROADS
  };
}


export const DISABLE_EDIT = 'DISABLE_EDIT';
export const disableEdit = () => {
  return { type: DISABLE_EDIT };
}

export const ADD_ELEVATION = 'ADD_ELEVATION';
export const addElevation = elevation => {
  return {
    type: ADD_ELEVATION,
    payload: elevation
  };
}

export const SHOW_POINT = 'SHOW_POINT';
export const showPoint = point => {
  return {
    type: SHOW_POINT,
    payload: point
  };
}

export const SET_NAME = 'SET_NAME';
export const setRouteName = name => {
  return {
    type: SET_NAME,
    payload: name
  };
}

export const SET_ID = 'SET_ID';
export const setRouteId = id => {
  return {
    type: SET_ID,
    payload: id
  };
}

export const addTrackAndGetElevation = (track, followsRoads = false) => {
  return dispatch => {
    const ele = new ElevationService(followsRoads);
    if (followsRoads) {
      const dir = new DirectionsService();
      dir.getRouteBetween(track[0], track[1])
        .then(track => {
          const t = addDistanceToTrack(track);
          dispatch(addTrack(t));
          dispatch(updateDistance());
          ele.getElevationData(track)
            .then(({ elevation }) => {
              dispatch(addElevation(addDistanceToElevation(elevation, t)));
              dispatch(updateAscent());     //
            })
            .catch(err => console.log('Error fetching elevation data', err));
        })
        .catch(err => console.log('Error fetching road directions', err));
    } else {
      let t = addDistanceToTrack(track);
      dispatch(addTrack(t));
      dispatch(updateDistance());
      ele.getElevationData(track)
        .then(({ elevation, track }) => {
          if (track) {
            t = addDistanceToTrack(track);
            dispatch(updateTrack(t));
            dispatch(addElevation(addDistanceToElevation(elevation, t)))
            dispatch(updateAscent());     //
          } else {
            dispatch(addElevation(addDistanceToElevation(elevation, track)))
            dispatch(updateAscent());     //
          }
        })
        .catch(err => console.log('Error fetching elevation data', err));
    }
  }
}

export const exportRoute = () => (dispatch, getState) => {
  const { name, track, elevation } = getState().route;
  const gpxService = new GpxService();
  const gpxData = gpxService.write({ name, track, elevation })
  const file = new FileService();
  file.save(gpxData);
}

// TODO: Remove the shit out of this number of dispatches...!!
export const importRoute = (e) => dispatch => {
  const fileService = new FileService();
  const gpxService = new GpxService();
  fileService.readTextFile(e.target)
    .then(data => {
      const { name, track, elevation } = gpxService.read(data);
      const { lat, lon, zoom } = getBounds({ track });
      const t = addDistanceToTrack(track);
      dispatch(clearRoute());
      dispatch(addTrack(t));
      dispatch(updateDistance());
      dispatch(addElevation(addDistanceToElevation(elevation, t)));
      dispatch(updateAscent());     //
      dispatch(setRoute({ name, editable: false }));
      dispatch(setMapCentre({ lat, lon }, zoom));
      dispatch(hideModal('import'));
      // this.makeRouteNonEditable();
    })
    .catch(err => console.log(err));
}

export const SAVE_ROUTE = 'SAVE_ROUTE';
export const saveRoute = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { route, user } = getState();
    const { uid } = user;
    if (!uid) { reject('You are not signed in'); }
    firebase.saveRoute(uid, route)
      .then(id => {
        dispatch(setRouteId(id));
        resolve();
      })
      .catch(err => reject(err));
  });
}

export const getRouteList = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { user } = getState();
    const { uid } = user;
    if (!uid) { reject('You are not signed in'); }
    firebase.getRouteList(uid)
      .then(routes => {
        // console.log('received routes', routes);  Make this reactive!
        resolve(routes)
      })
      .catch(err => reject(err));
  });
}

export const getRoute = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { user } = getState();
    const { uid } = user;
    if (!uid) { reject('You are not signed in'); }
    firebase.getRoute(uid, id) // error trap for routeid not found
      .then(route => {
        const { lat, lon, zoom } = getBounds(route);
        // dispatch(clearRoute());
        dispatch(setRoute(route));
        dispatch(setMapCentre({ lat, lon }, zoom));
        history.push('/route');
        resolve();
      })
      .catch(err => reject(err));
  });
}

export const getEmbedRoute = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    firebase.getEmbedRoute(id) // error trap for routeid not found
      .then(route => {
        const { lat, lon, zoom } = getBounds(route);
        // dispatch(clearRoute());
        dispatch(setRoute(route));
        dispatch(setMapCentre({ lat, lon }, zoom));
        resolve();
      })
      .catch(err => reject(err));
  });
}

export const deleteRoute = routeId => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { user } = getState();
    const { uid } = user;
    if (!uid) { reject('You are not signed in'); }
    resolve(firebase.deleteRoute(uid, routeId));
  });
}

export const goToRouteList = () => {
  history.push('/routes');
}