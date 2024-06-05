
// const firebaseConfig = {
//     apiKey: "AIzaSyDBHTUtOeuCON7AEF3UPPxU1sHsnFfBv-M",
//     authDomain: "ecommerce-for.firebaseapp.com",
//     projectId: "ecommerce-for",
//     storageBucket: "ecommerce-for.appspot.com",
//     messagingSenderId: "609664686595",
//     appId: "1:609664686595:web:302bf25cc8efa64a4e4c36"
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyD4E72VkIynXf-uqLUqPc4yywGCH1IRGuQ",
  authDomain: "e-commerce-4e67e.firebaseapp.com",
  projectId: "e-commerce-4e67e",
  storageBucket: "e-commerce-4e67e.appspot.com",
  messagingSenderId: "515303367724",
  appId: "1:515303367724:web:eacba6a647ea4467999d89",
  measurementId: "G-E32MFZZCND"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const db = getFirestore();


export { fireDB, auth , db   }