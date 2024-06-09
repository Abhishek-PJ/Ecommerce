import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                <div className="bg-white shadow-lg rounded-xl p-4 lg:p-8">
                    {/* Profile Information */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="Profile" className="w-24 h-24 rounded-full border-4 border-pink-500" />
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl font-bold">{user?.name}</h3>
                                <p className="text-gray-600">Email: {user?.email}</p>
                                <p className="text-gray-600">Role: {user?.role}</p>
                                <Link to="/Userprofileupdate" className="text-pink-500 hover:underline">Edit Profile</Link>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        <div className="space-y-8">
                            {loading ? <Loader /> : (
                                getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                                    <div key={index} className="bg-gray-100 rounded-xl p-4 lg:p-6">
                                        <h3 className="text-xl font-bold mb-4">Order #{order.id}</h3>
                                        <div className="space-y-4">
                                            {order.cartItems.map((item, idx) => (
                                                <div key={idx} className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 border-b pb-4 last:border-b-0">
                                                    <img src={item.productImageUrl} alt={item.title} className="w-16 h-16 rounded-md" />
                                                    <div className="text-center lg:text-left">
                                                        <h4 className="text-lg font-semibold">{item.title}</h4>
                                                        <p className="text-gray-600">Category: {item.category}</p>
                                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <p className="text-gray-700 font-semibold">₹{item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
