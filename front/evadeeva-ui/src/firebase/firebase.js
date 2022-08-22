import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDmxMVaJ1RPC0k8yJZUZLgVO5N75lvQyjY",
    authDomain: "web-infor-system.firebaseapp.com",
    projectId: "web-infor-system",
    storageBucket: "web-infor-system.appspot.com",
    messagingSenderId: "540244164341",
    appId: "1:540244164341:web:aad2264f4983f634ea4fbc",
    measurementId: "G-33X59K2051",
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage().ref();
const providerFaceBook = new firebase.auth.FacebookAuthProvider();
export { firebase, database, provider, providerFaceBook, storageRef };
