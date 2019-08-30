import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth/dist/index.cjs";
import "firebase/database/dist/index.cjs";

const firebaseConfig = {
  apiKey: "AIzaSyDAp5skb4lK_VQ1smMdPy-1WQMCWLIo69g",
  authDomain: "highlyfe-a13c4.firebaseapp.com",
  databaseURL: "https://highlyfe-a13c4.firebaseio.com",
  projectId: "highlyfe-a13c4",
  storageBucket: "highlyfe-a13c4.appspot.com",
  messagingSenderId: "471278443098",
  appId: "1:471278443098:web:37f30e4226bbf074"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)
}

const auth = firebase.auth();
auth.useDeviceLanguage;
const fsdb = firebase.firestore();
const rtdb = firebase.database();

export { auth, fsdb, rtdb }