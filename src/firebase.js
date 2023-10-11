// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDozbfEZ6clrWmvh3iUdNys4yDMNA00y5M",
  authDomain: "instacast-ef5b5.firebaseapp.com",
  projectId: "instacast-ef5b5",
  storageBucket: "instacast-ef5b5.appspot.com",
  messagingSenderId: "853937386108",
  appId: "1:853937386108:web:3fe5277ccc2f5c85844ff9",
  measurementId: "G-X11ZCDVJFS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };
