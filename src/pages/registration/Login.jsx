<<<<<<< HEAD
import { useState, useContext } from "react";
=======
import { useContext, useState } from "react";
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
<<<<<<< HEAD
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loadCartFromFirebase } from "../../redux/cartSlice";
import { loadCartFromFirebase as loadCartFromFirebaseUtil } from "../../utils/cartUtils";
import { useCartPersistence } from "../../hooks/useCartPersistence";
import Loader from "../../components/loader/Loader";
=======
import Loader from "../../components/loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
import Googleauthpage from "./Googleauthpage";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
<<<<<<< HEAD
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleUserLogin } = useCartPersistence();
=======

    const navigate = useNavigate();
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7

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
<<<<<<< HEAD

=======
    
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            console.log('Login Successful:', users);
<<<<<<< HEAD

=======
    
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users.user.uid)
            );
            const querySnapshot = await getDocs(q);
            let user;
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
<<<<<<< HEAD

=======
    
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
            if (!user) {
                toast.error("User not found");
                setLoading(false);
                return;
            }
<<<<<<< HEAD

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
            
=======
    
    
            localStorage.setItem("users", JSON.stringify(user));
            console.log('User stored in localStorage:', localStorage.getItem("users"));
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
            setUserLogin({
                email: "",
                password: ""
            });
<<<<<<< HEAD
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
=======
            toast.success("Login Successfully");

    
            // Log the user role
            const userRole = user.role.toLowerCase();
            console.log(userRole);
    
            if (userRole === "user") {            
                    console.log("Navigating to Home page");
                navigate('/');
            } else if (userRole === "admin") {
                console.log("Navigating to admin dashboard");
                navigate('/admin-dashboard');
            } else {
                toast.error("Invalid role");
            }
        } catch (error) {
            console.error('Login Failed:', error);
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className='flex justify-center items-center min-h-screen bg-pink-100'>
            {loading && <Loader />}
            <div className="login_Form bg-white px-8 py-6 border border-pink-100 rounded-xl shadow-md w-full max-w-md m-2 relative">
                <Link to="/" className="absolute top-0 left-0 p-4">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-600'>Login</h2>
                </div>

                <form onSubmit={userLoginFunction}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder='Email Address'
                            value={userLogin.email}
                            onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                            className='bg-pink-50 border border-pink-200 px-4 py-2 w-full rounded-md outline-none placeholder-gray-500'
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-5">
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={userLogin.password}
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                            className='bg-pink-50 border border-pink-200 px-4 py-2 w-full rounded-md outline-none placeholder-gray-500'
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="mb-5">
                        <button
                            type='submit'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'
                        >
                            Login
                        </button>
                    </div>
                </form>
                
                <h2 className="text-gray-700 font-extrabold flex justify-center">OR</h2>
                
                <div className="mb-5">
                    <Googleauthpage />
                </div>

                <div className="m-1">
                    <h2 className='text-black font-bold flex justify-center'>Don't Have an account? <Link className='text-pink-700  mx-2 font-bold' to={'/signup'}>Signup</Link></h2>
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
                </div>
            </div>
        </div>
    );
};

export default Login;
