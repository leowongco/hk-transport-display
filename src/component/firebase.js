import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALgRvnckKEdpT_BCcii9ozcCCB9aMeXAg",
  authDomain: "hk-train-display.firebaseapp.com",
  projectId: "hk-train-display",
  storageBucket: "hk-train-display.appspot.com",
  messagingSenderId: "540263952826",
  appId: "1:540263952826:web:c419a24a75166bf6ed6d83",
  measurementId: "G-S56B93FKZ0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };