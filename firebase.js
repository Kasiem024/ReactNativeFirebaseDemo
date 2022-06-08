'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAv3vCkCfF2nC_rqBs9DLnZ--NmOdHYhg",
  authDomain: "react-firebase-demo-b4b1d.firebaseapp.com",
  projectId: "react-firebase-demo-b4b1d",
  storageBucket: "react-firebase-demo-b4b1d.appspot.com",
  messagingSenderId: "713908071221",
  appId: "1:713908071221:web:440a8eaadc700916c4fa7c",
  measurementId: "G-31B2LXSJ3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };