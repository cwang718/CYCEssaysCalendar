import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    databaseURL: process.env.REACT_APP_FIREBASE_dburl,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_appId,
};

let firebaseCycEssays;
try {
  firebaseCycEssays = firebase.initializeApp(firebaseConfig);
} catch (err) {}

const fireDb = firebaseCycEssays.database();

export { fireDb };