import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            console.log('Login Successful:', users);

            try {
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

                console.log('User Data:', user);

                localStorage.setItem("users", JSON.stringify(user));
                setUserLogin({
                    email: "",
                    password: ""
                });
                toast.success("Login Successfully");
                setLoading(false);

                if (user.role.toLowerCase() === "user") {
                    console.log('Navigating to /user-dashboard');
                    navigate('/user-dashboard');
                } else {
                    console.log('Navigating to /admin-dashboard');
                    navigate('/admin-dashboard');
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
                setLoading(false);
                toast.error("Failed to fetch user data");
            }
        } catch (error) {
            console.log('Login Failed:', error);
            setLoading(false);
            toast.error("Login Failed");
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-pink-50'>
            {loading && <Loader />}
            <div className="login_Form bg-white px-8 py-6 border border-pink-100 rounded-xl shadow-md w-full max-w-md  m-2" >
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500'>
                        Login
                    </h2>
                </div>

                <form onSubmit={userLoginFunction}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder='Email Address'
                            value={userLogin.email}
                            onChange={(e) => {
                                setUserLogin({
                                    ...userLogin,
                                    email: e.target.value
                                });
                            }}
                            className='bg-pink-50 border border-pink-200 px-4 py-2 w-full rounded-md outline-none placeholder-pink-200'
                            autoComplete="email"
                        />
                    </div>

                    <div className="mb-5">
                        <input
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={userLogin.password}
                            onChange={(e) => {
                                setUserLogin({
                                    ...userLogin,
                                    password: e.target.value
                                });
                            }}
                            className='bg-pink-50 border border-pink-200 px-4 py-2 w-full rounded-md outline-none placeholder-pink-200'
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

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
