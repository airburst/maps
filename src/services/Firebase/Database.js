import fire from './config';

export default class FirebaseService {

  constructor() {
    this.db = fire.database().ref();
  }

  // connect(callback) {
  //   this.db.on('value', data => callback(data));
  // }

  // notifyAdded(callback) {
  //   this.db.on('child_added', data => callback(data));
  // }

  saveRoute = (uid, route) => {
    return new Promise((resolve, reject) => {
      if (!uid || uid === undefined) { reject('You are not signed in') }
      const routeId = route.id ? route.id : this.db.child(uid).push().key;
      resolve(this.updateRoute(uid, routeId, route));
    });
  }

  updateRoute = (uid, routeId, route) => {
    return new Promise((resolve, reject) => {
      if (!uid || uid === undefined) { reject('You are not signed in') }
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
