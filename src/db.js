import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyACw3t_eq4PCOTIrEKtAiVhfSJJtg69HtI",
    authDomain: "qwenti.firebaseapp.com",
    projectId: "qwenti",
    storageBucket: "qwenti.appspot.com",
    messagingSenderId: "657887503910",
    appId: "1:657887503910:web:98dfa1e573a00ea7c1a8e7",
    measurementId: "G-QVF1MP9JG4",
  })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });
