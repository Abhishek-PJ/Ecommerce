import { useState } from "react";
import { useNavigate } from "react-router";


const Userprofileupdate = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const navigate=useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to update the user's profile with the formData
        console.log(formData);
    }
    const cancelUpdate = () => {
        navigate("/user-dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 py-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 mx-4 sm:mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-800 text-xl font-semibold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border-3 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-pink-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-800  text-xl  font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border-3 border-gray-300  hover:border-pink-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transform "
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={cancelUpdate}
                            type="button"
                            className="bg-pink-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transform" 
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Userprofileupdate;
