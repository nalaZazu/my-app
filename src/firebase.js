import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyChLR-gRxi10-VFrw-4pTgk4QkgfN3x6oM",
  authDomain: "clone-1ede7.firebaseapp.com",
  projectId: "clone-1ede7",
  storageBucket: "clone-1ede7.appspot.com",
  messagingSenderId: "202358785889",
  appId: "1:202358785889:web:67e9a6fa0000c38df26720"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export  { db, auth };