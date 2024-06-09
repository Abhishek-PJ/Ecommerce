import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Googleauthpage from "./Googleauthpage"; // Correct casing

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleRoleChange = (event) => {
    setUserSignup({
      ...userSignup,
      role: event.target.value,
    });
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const userSignupFunction = async () => {
    if (
      !userSignup.name.trim() ||
      !userSignup.email.trim() ||
      !userSignup.password.trim() ||
      !userSignup.role.trim()
    ) {
      toast.error("All Fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userSignup.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(userSignup.password)) {
      toast.error(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");

      await addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      toast.success("Signup Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      {loading && <Loader />}
      <div className="signup_Form bg-white px-8 py-6 border border-pink-100 rounded-xl shadow-md max-w-md w-full m-2 relative">
        <Link to="/" className="absolute top-0 left-0 p-4">
          <svg
            className="w-6 h-6 text-pink-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Signup
          </h2>
        </div>

        <div className="mb-5">
          <label className="mb-2 text-lg text-pink-600 font-semibold">
            Select Role:
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="userRole"
                value="Admin"
                checked={userSignup.role === "Admin"}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label
                htmlFor="admin"
                className="text-sm font-medium text-gray-700"
              >
                Admin
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="user"
                name="userRole"
                value="User"
                checked={userSignup.role === "User"}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label
                htmlFor="user"
                className="text-sm font-medium text-gray-700"
              >
                User
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
            className="border border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-500"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            className="border border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-500"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            className="border border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-500"
          />
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Signup
          </button>
        </div>

        <h2 className="text-gray-700 font-extrabold flex justify-center">OR</h2>

        <div className="mb-5">
          <Googleauthpage />
        </div>
        <span className=" text-red-400">Google signup bydefault registers you as User.
          For registering as admin use only form registration.
        </span>
        <br /><br />


        <div>
          <h2 className="text-black text-center">
            Have an account?{" "}
            <Link className="text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
