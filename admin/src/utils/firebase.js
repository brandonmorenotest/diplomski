// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blogwavee.firebaseapp.com",
  projectId: "blogwavee",
  storageBucket: "blogwavee.appspot.com",
  messagingSenderId: "831708141535",
  appId: "1:831708141535:web:67ef10111f5d8fa5e5566a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);