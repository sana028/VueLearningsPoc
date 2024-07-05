/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore , connectFirestoreEmulator} from "firebase/firestore";
import { getAuth,connectAuthEmulator } from "firebase/auth";
import 'firebase/firestore';
import { getDatabase,connectDatabaseEmulator } from 'firebase/database';
import { getStorage,connectStorageEmulator } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const storage=getStorage();
// connectFirestoreEmulator(db, "http://127.0.0.1:8989");
// connectAuthEmulator(auth,"http://127.0.0.1:9099");


export { db, auth, database, storage};