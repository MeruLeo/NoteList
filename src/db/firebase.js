// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9vwnSyWbhgzv1_FW7j7qWwqbC4pHUGEQ",
  authDomain: "notelist-fe180.firebaseapp.com",
  projectId: "notelist-fe180",
  storageBucket: "notelist-fe180.appspot.com",
  messagingSenderId: "797791296309",
  appId: "1:797791296309:web:77f9f5c3f5da7bc03cca7c",
  measurementId: "G-LRB5KJG6JJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
