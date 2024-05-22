// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDBHTUtOeuCON7AEF3UPPxU1sHsnFfBv-M",
//     authDomain: "ecommerce-for.firebaseapp.com",
//     projectId: "ecommerce-for",
//     storageBucket: "ecommerce-for.appspot.com",
//     messagingSenderId: "609664686595",
//     appId: "1:609664686595:web:302bf25cc8efa64a4e4c36"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDnDb5_MDQ3rW5B1txaH1q4BX734JDcdME",
    authDomain: "caramel-limiter-404807.firebaseapp.com",
    projectId: "caramel-limiter-404807",
    storageBucket: "caramel-limiter-404807.appspot.com",
    messagingSenderId: "475245365846",
    appId: "1:475245365846:web:1e1d2bbe61652b177ac9f7",
    measurementId: "G-KXPE9C8KF6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);


export { fireDB, auth }