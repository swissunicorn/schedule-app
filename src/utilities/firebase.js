// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLMNp9c_eZrl8E_Yc6Kkffev4tnAMCUTA",
  authDomain: "scheduler-hosting-demo.firebaseapp.com",
  databaseURL: "https://scheduler-hosting-demo-default-rtdb.firebaseio.com",
  projectId: "scheduler-hosting-demo",
  storageBucket: "scheduler-hosting-demo.appspot.com",
  messagingSenderId: "690114532480",
  appId: "1:690114532480:web:13f9b8578abfc60ddd0265",
  measurementId: "G-W3XDGCW37K"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);