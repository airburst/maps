/* 
    Firebase schema:

      routes:   stores a keyed set of route data (track, elevation, waypoints)
                Only fetched directly, by id, to minimise read data
     
      user id:  uses the same key as route to hold metadata.
                This is traversed, per user, to render route cards.
*/
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
      route.on('value', snapshot => resolve(snapshot.val()));
    });
  }

  getRoute(uid, id) {
    return new Promise((resolve, reject) => {
      if (!uid || !id) { reject(AUTH_ERROR) }
      const route = this.db.child('routes').child(id);
      route.on('value', snapshot => {
        const { waypoints, track, elevation, distance, ascent } = snapshot.val();
        const meta = this.db.child(uid).child(id);
        meta.on('value', metashot => {
          const { name, lastModified, editable } = metashot.val();
          resolve({ id, name, waypoints, track, elevation, distance, ascent, lastModified, editable });
        });
      });
    });
  }

  saveRoute = (uid, routeData) => {
    return new Promise((resolve, reject) => {
      if (!uid) { reject(AUTH_ERROR) }
      const { id, route, meta } = this.getRouteData(routeData);
      if (!id) {
        const routeId = this.db.child('routes').push().key;
        this.db.child('routes').child(routeId).update(route);
        this.db.child(uid).child(routeId).set(meta);
        resolve(routeId);
      } else {
        resolve(this.updateRoute(uid, routeData));
      }
    });
  }

  updateRoute = (uid, routeData) => {
    return new Promise((resolve, reject) => {
      const { id, route, meta } = this.getRouteData(routeData);
      this.db.child('routes').child(id).update(route);
      this.db.child(uid).child(id).update(meta);
      resolve(id);
    });
  }

  deleteRoute(uid, routeId) {
    if (!uid) { return null; }
    this.db.child('routes').child(routeId).remove();
    this.db.child(uid).child(routeId).remove();
    return;
  }

  getRouteData(data) {
    const { id, name, waypoints, track, elevation, distance, ascent, editable } = data;
    const lastModified = new Date().toISOString();
    return {
      id,
      route: { waypoints, track, elevation, distance, ascent },
      meta: { name, lastModified, editable }
    };
  }

}
