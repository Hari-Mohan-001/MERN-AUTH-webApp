// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b48d2.firebaseapp.com",
  projectId: "mern-auth-b48d2",
  storageBucket: "mern-auth-b48d2.appspot.com",
  messagingSenderId: "1047528615876",
  appId: "1:1047528615876:web:34615cba0d65d48b273e91"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);