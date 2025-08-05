// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

<<<<<<< HEAD
// Suppress non-critical Firebase warnings and network errors
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  const message = args[0];
  if (typeof message === 'string') {
    // Suppress specific Firebase warnings
    if (message.includes('Cross-Origin-Opener-Policy') || 
        message.includes('ERR_BLOCKED_BY_CLIENT') ||
        message.includes('window.closed') ||
        message.includes('net::ERR_BLOCKED_BY_CLIENT') ||
        message.includes('firestore.googleapis.com') ||
        message.includes('gapi.loaded')) {
      return;
    }
  }
  originalConsoleError.apply(console, args);
};

console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string') {
    // Suppress specific Firebase warnings
    if (message.includes('Cross-Origin-Opener-Policy') || 
        message.includes('ERR_BLOCKED_BY_CLIENT') ||
        message.includes('window.closed') ||
        message.includes('net::ERR_BLOCKED_BY_CLIENT') ||
        message.includes('firestore.googleapis.com') ||
        message.includes('gapi.loaded')) {
      return;
    }
  }
  originalConsoleWarn.apply(console, args);
};

// Suppress network errors in the global scope
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    return originalFetch.apply(this, args).catch(error => {
      // Suppress blocked client errors
      if (error.message && error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        return new Response(null, { status: 200 });
      }
      throw error;
    });
  };
}
=======
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7

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

<<<<<<< HEAD
=======

>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
export { fireDB, auth, storage,provider, signInWithPopup };
