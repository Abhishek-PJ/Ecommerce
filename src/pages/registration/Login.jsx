import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loadCartFromFirebase } from "../../redux/cartSlice";
import { loadCartFromFirebase as loadCartFromFirebaseUtil } from "../../utils/cartUtils";
import { useCartPersistence } from "../../hooks/useCartPersistence";
import Loader from "../../components/loader/Loader";
import Googleauthpage from "./Googleauthpage";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleUserLogin } = useCartPersistence();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async (e) => {
        e.preventDefault();
        if (!userLogin.email.trim() || !userLogin.password.trim()) {
            toast.error("All Fields are required");
            return;
        }
        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            console.log('Login Successful:', users);
            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users.user.uid)
            );
            const querySnapshot = await getDocs(q);
            let user;
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
            if (!user) {
                toast.error("User not found");
                setLoading(false);
                return;
            }

            localStorage.setItem("users", JSON.stringify(user));
            console.log('User stored in localStorage:', localStorage.getItem("users"));
            
            // Use the new cart persistence hook to handle cart merging
            try {
                await handleUserLogin(users.user.uid);
                toast.success("Login Successfully");
            } catch (error) {
                console.error('Error handling cart during login:', error);
                toast.success("Login Successfully");
            }
            
            setUserLogin({
                email: "",
                password: ""
            });
            navigate("/");
        } catch (error) {
            console.log('Login Error:', error);
            toast.error("Login Failed");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-pink-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-pink-100">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-pink-600">Login</h2>
                    <p className="text-gray-600 mt-2">Welcome back to E-Commerce</p>
                </div>

                <form onSubmit={userLoginFunction}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userLogin.email}
                            onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                            className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={userLogin.password}
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                            className="w-full px-3 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition duration-300 font-bold"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 mb-4">Or continue with</p>
                    <Googleauthpage />
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-pink-600 hover:text-pink-700 font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
