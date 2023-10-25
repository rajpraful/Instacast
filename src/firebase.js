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
  apiKey: "AIzaSyBB2WGT9ZVtR2eSPDkh4BFoe-buWCFZUaw",
   authDomain: "instacast-podcast-app.firebaseapp.com",
   projectId: "instacast-podcast-app",
   storageBucket: "instacast-podcast-app.appspot.com",
   messagingSenderId: "121252124979",
   appId: "1:121252124979:web:ba9fe209e2436f5b07c646",
   measurementId: "G-ZTKMMXK04Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };
