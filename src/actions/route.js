import ElevationService from '../services/ElevationService';
import DirectionsService from '../services/DirectionsService';
import FileService from '../services/FileService';
import GpxService from '../services/GpxService';
import { 
  addDistanceToTrack, 
  addDistanceToElevation 
} from '../services/GeometryService';

export const ADD_POINT = 'ADD_POINT';
export const addPoint = point => {
  return {
    type: ADD_POINT,
    payload: point
  };
}

export const REMOVE_POINT = 'REMOVE_POINT';
export const removePoint = point => dispatch => {
  dispatch({
    type: REMOVE_POINT,
    payload: point
  });
  dispatch(updateDistance());
}

export const CLEAR_ROUTE = 'CLEAR_ROUTE';
export const clearRoute = () => {
  return {
    type: CLEAR_ROUTE
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

export const TOGGLE_FOLLOWS_ROADS = 'TOGGLE_FOLLOWS_ROADS';
export const toggleFollowsRoads = () => {
  return {
    type: TOGGLE_FOLLOWS_ROADS
  };
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

// TODO - apply same elevation tricks to walk mode
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
              dispatch(addElevation(addDistanceToElevation(elevation, t)))
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
          } else {
            dispatch(addElevation(addDistanceToElevation(elevation, track)))
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
