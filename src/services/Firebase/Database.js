import fire from './config';

const AUTH_ERROR = 'You are not signed in';

export default class FirebaseService {

  constructor() {
    this.db = fire.database().ref();
  }

  getRouteList(uid) {
    return new Promise((resolve, reject) => {
      if (!uid) { reject(AUTH_ERROR) }
      const route = this.db.child(uid);
      route.once('value', snapshot => resolve(snapshot.val()));
    });
  }

  getRoute(uid, routeId) {
    return new Promise((resolve, reject) => {
      if (!uid || !routeId) { reject(AUTH_ERROR) }
      const route = this.db.child(uid).child(routeId);
      route.on('value', snapshot => resolve(snapshot.val()));
    });
  }

  saveRoute = (uid, route) => {
    return new Promise((resolve, reject) => {
      if (!uid || uid === undefined) { reject(AUTH_ERROR) }
      const routeId = route.id ? route.id : this.db.child(uid).push().key;
      resolve(this.updateRoute(uid, routeId, route));
    });
  }

  updateRoute = (uid, routeId, route) => {
    return new Promise((resolve, reject) => {
      if (!uid || uid === undefined) { reject(AUTH_ERROR) }
      const { name, waypoints, track, elevation } = route;
      let update = {};
      if (name) { update['name'] = name; }
      if (waypoints) { update['waypoints'] = waypoints; }
      if (track) { update['track'] = track; }
      if (elevation) { update['elevation'] = elevation; }
      this.db.child(uid).child(routeId).update(update);
      resolve(routeId);
    });
  }

  deleteRoute(uid, routeId) {
    if (!uid) { return null; }
    return this.db.child(uid).child(routeId).remove();
  }

}
