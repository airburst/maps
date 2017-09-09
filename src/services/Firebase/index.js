import fire from './config';

export default class FirebaseService {

  constructor() {
    this.db = fire.database();
  }

  // connect(callback) {
  //   this.db.on('value', data => callback(data));
  // }

  // notifyAdded(callback) {
  //   this.db.on('child_added', data => callback(data));
  // }

  // getRoute(id) {
  //   return this.fetch(this.baseUrl + id)
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  saveRoute(uid, route) {
    if (!uid) { return null; }  // Plus other validation on route
    const { name, track, elevation } = route;
    const newRouteId = this.db.ref().child(uid).push().key;
    return newRouteId;
  }

  updateRoute(uid, routeId, route) {
    if (!uid) { return null; }  // Plus other validation on route
    const { name, track, elevation } = route;
    let update = {};
    if (name) { update['name'] = name; }
    if (track) { update['track'] = track; }
    if (elevation) { update['elevation'] = elevation; }
    return this.db.ref().child(uid).child(routeId).update(update);
  }

  deleteRoute(uid, routeId) {
    if (!uid) { return null; }
    return this.db.ref().child(uid).child(routeId).remove();
  }

}

// componentWillMount(){
//   /* Create reference to messages in Firebase Database */
//   let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
//   messagesRef.on('child_added', snapshot => {
//     /* Update React state when message is added at Firebase Database */
//     let message = { text: snapshot.val(), id: snapshot.key };
//     this.setState({ messages: [message].concat(this.state.messages) });
//   })
// }
