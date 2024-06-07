/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import {getDatabase} from 'firebase/database'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUnUPyolOilTY-j0L3IKn6LyaWQzZUqK8",
  authDomain: "fir-learnings-5cc16.firebaseapp.com",
  databaseURL: "https://fir-learnings-5cc16-default-rtdb.firebaseio.com",
  projectId: "fir-learnings-5cc16",
  storageBucket: "fir-learnings-5cc16.appspot.com",
  messagingSenderId: "291226500849",
  appId: "1:291226500849:web:5ef45fc6927a12c503b350",
  measurementId: "G-635GSLRZFL"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeFirestore(app,{localCache: persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})})
const db = getFirestore(app);
const auth = getAuth(app);
const database=getDatabase(app);


export { db, auth, database};