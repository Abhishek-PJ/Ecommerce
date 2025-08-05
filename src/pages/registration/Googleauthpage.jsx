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
    );
};

export default Googleauthpage;
