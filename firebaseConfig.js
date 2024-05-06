/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMwyUw_R3x5LI4IH8VVofbtiXELixbxC0",
  authDomain: "vuebasics.firebaseapp.com",
  projectId: "vuebasics",
  storageBucket: "vuebasics.appspot.com",
  messagingSenderId: "699030981575",
  appId: "1:699030981575:web:59a9e4f94e598efce827e2",
  measurementId: "G-H0S0H3FWVS"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);

export  {db,auth};