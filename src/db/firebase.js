import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// کانفیگ Firebase پروژه شما
const firebaseConfig = {
  apiKey: "AIzaSyB9vwnSyWbhgzv1_FW7j7qWwqbC4pHUGEQ",
  authDomain: "notelist-fe180.firebaseapp.com",
  projectId: "notelist-fe180",
  storageBucket: "notelist-fe180.appspot.com",
  messagingSenderId: "797791296309",
  appId: "1:797791296309:web:77f9f5c3f5da7bc03cca7c",
  measurementId: "G-LRB5KJG6JJ",
};

// مقداردهی اولیه Firebase
const app = initializeApp(firebaseConfig);

// دسترسی به Firestore
const db = getFirestore(app);

export default db;
