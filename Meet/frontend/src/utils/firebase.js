


import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fir-implement-c4ef9.firebaseapp.com",
  projectId: "fir-implement-c4ef9",
  storageBucket: "fir-implement-c4ef9.firebasestorage.app",
  messagingSenderId: "290648799389",
  appId: "1:290648799389:web:0043e091d1352dccfd3c74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider} 