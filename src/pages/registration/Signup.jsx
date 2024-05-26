import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleRoleChange = (event) => {
        setUserSignup({
            ...userSignup,
            role: event.target.value
        });
    };

    // Password validation function
    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const userSignupFunction = async () => {
        // Validation for empty fields
        if (userSignup.name.trim() === "" || userSignup.email.trim() === "" || userSignup.password.trim() === "" || userSignup.role.trim() === "") {
            toast.error("All Fields are required");
            return;
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(userSignup.email)) {
            toast.error("Invalid email address");
            return;
        }

        // Validate password
        if (!validatePassword(userSignup.password)) {
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user");

            // Add User Detail
            await addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: "",
                role: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-pink-100 '>
            {loading && <Loader />}
            {/* Signup Form */}
            <div className="signup_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md max-w-md w-full m-2">
                {/* Top Heading */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* User Role Selection */}
                <div className="mb-5">
                    <label className="mb-2 text-lg text-red-500 font-semibold">Select Role:</label>
                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="admin"
                                name="userRole"
                                value="Admin"
                                checked={userSignup.role === 'Admin'}
                                onChange={handleRoleChange}
                                className="mr-2"
                            />
                            <label htmlFor="admin" className="text-sm font-medium text-gray-700">
                                Admin
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="user"
                                name="userRole"
                                value="User"
                                checked={userSignup.role === 'User'}
                                onChange={handleRoleChange}
                                className="mr-2"
                            />
                            <label htmlFor="user" className="text-sm font-medium text-gray-700">
                                User
                            </label>
                        </div>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            });
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            });
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            });
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black text-center'>Have an account? <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
