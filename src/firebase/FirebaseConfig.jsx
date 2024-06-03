
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
  apiKey: "AIzaSyD7xxni01wZOvfrkbd2Q5kJI2CIOrluFdc",
  authDomain: "ecommerce-react-e6aef.firebaseapp.com",
  projectId: "ecommerce-react-e6aef",
  storageBucket: "ecommerce-react-e6aef.appspot.com",
  messagingSenderId: "861948693140",
  appId: "1:861948693140:web:54e16e5f26fd42fb68c281",
  measurementId: "G-4NKKDYW419"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const db = getFirestore();

export { fireDB, auth , db }