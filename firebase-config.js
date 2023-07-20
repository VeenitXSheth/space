// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfA8CHzkBlLrhhaS9x8ms3ID7swsiVg10",
  authDomain: "space-a341b.firebaseapp.com",
  projectId: "space-a341b",
  storageBucket: "space-a341b.appspot.com",
  messagingSenderId: "137932140863",
  appId: "1:137932140863:web:f0d99c5b231a9cf0da638a",
  measurementId: "G-N055QPV1SW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);