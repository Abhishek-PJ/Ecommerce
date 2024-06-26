// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4E72VkIynXf-uqLUqPc4yywGCH1IRGuQ",
  authDomain: "e-commerce-4e67e.firebaseapp.com",
  projectId: "e-commerce-4e67e",
  storageBucket: "e-commerce-4e67e.appspot.com",
  messagingSenderId: "515303367724",
  appId: "1:515303367724:web:eacba6a647ea4467999d89",
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();


export { fireDB, auth, storage,provider, signInWithPopup };
