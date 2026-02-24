// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "middleman-real-estate.firebaseapp.com",
  projectId: "middleman-real-estate",
  storageBucket: "middleman-real-estate.firebasestorage.app",
  messagingSenderId: "917455528249",
  appId: "1:917455528249:web:43c498f132373fb989c8e8",
  measurementId: "G-YQVYFGM519"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);