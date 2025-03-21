// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlHOzjO4qwAQo2-msqwqTgjZzOlKkN4Nk",
  authDomain: "orchid-23094.firebaseapp.com",
  projectId: "orchid-23094",
  storageBucket: "orchid-23094.firebasestorage.app",
  messagingSenderId: "831606955117",
  appId: "1:831606955117:web:430ab1500839f31e0e7364",
  measurementId: "G-J04FMWRF2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };
