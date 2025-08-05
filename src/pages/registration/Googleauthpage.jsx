<<<<<<< HEAD
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import signingoogle from "../../assets/signingoogle.png";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loadCartFromFirebase } from "../../redux/cartSlice";
import { loadCartFromFirebase as loadCartFromFirebaseUtil } from "../../utils/cartUtils";
import { useCartPersistence } from "../../hooks/useCartPersistence";

const Googleauthpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleUserLogin } = useCartPersistence();

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user already exists in Firestore
            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', user.uid)
            );
            const querySnapshot = await getDocs(q);
            let userData = null;

            querySnapshot.forEach((doc) => {
                userData = doc.data();
            });

            if (!userData) {
                // Create new user document
                const userData = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    role: "user",
                    time: new Date().toISOString()
                };

                await addDoc(collection(fireDB, "user"), userData);
                localStorage.setItem("users", JSON.stringify(userData));
            } else {
                localStorage.setItem("users", JSON.stringify(userData));
            }
            
            // Use the new cart persistence hook to handle cart merging
            try {
                await handleUserLogin(user.uid);
                toast.success(`Welcome ${user.displayName}!`);
            } catch (error) {
                console.error('Error handling cart during Google login:', error);
                toast.success(`Welcome ${user.displayName}!`);
            }
            
            navigate("/");
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("Google login failed");
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-white border border-pink-200 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300"
        >
            <img src={signingoogle} alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
        </button>
=======
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { collection, getDocs, query, where, addDoc, Timestamp } from 'firebase/firestore';
import signingoogle from '../../assets/signingoogle.png'; // Adjust the import path according to your project structure

const Googleauthpage = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
    
            const userRef = collection(fireDB, "user");
            const q = query(userRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
    
            let userData = null;
            querySnapshot.forEach((doc) => {
                userData = doc.data();
            });
    
            if (!userData) {
                // New user, add to Firestore
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    role: "user", // default role
                    time: Timestamp.now(),
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    }),
                };
                await addDoc(userRef, newUser);
                userData = newUser;
            }
    
            localStorage.setItem("users", JSON.stringify(userData));
            toast.success(`Welcome ${user.displayName}!`);
    
            const userRole = userData.role.toLowerCase();
            if (userRole === "user") {
                navigate('/');
            } else if (userRole === "admin") {
                navigate('/admin-dashboard');
            } else {
                toast.error("Invalid role");
            }
        } catch (error) {
            toast.error(`Authentication failed: ${error.message}`);
        }
    };
    

    return (
        <div onClick={handleGoogleLogin} className="cursor-pointer flex justify-center">
            <img 
                src={signingoogle} 
                alt="Sign in with Google" 
                style={{ width: 250, height: 100 }} 
            />
        </div>
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
    );
};

export default Googleauthpage;
