import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBMbOcZ7egI9aZ7ZfFezrb_Tmof_kYCuvA",
  authDomain: "routes-9cee1.firebaseapp.com",
  databaseURL: "https://routes-9cee1.firebaseio.com",
  projectId: "routes-9cee1",
  storageBucket: "routes-9cee1.appspot.com",
  messagingSenderId: "642114885858"
};
const fire = firebase.initializeApp(config);

export default fire;
