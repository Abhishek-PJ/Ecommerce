
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
    apiKey: "AIzaSyAeUCCYYSMnTNUWu2qjz7Sc5QGOD4r-Naw",
    authDomain: "ecommerce-react-b607c.firebaseapp.com",
    projectId: "ecommerce-react-b607c",
    storageBucket: "ecommerce-react-b607c.appspot.com",
    messagingSenderId: "537084935584",
    appId: "1:537084935584:web:026ad4a996e60f13c5b8c5",
    measurementId: "G-TWFPMHPCEF"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const db = getFirestore();

export { fireDB, auth , db }