
// import { useState } from "react";
// import { Dialog, DialogBody, Button } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"

// const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction, userrole }) => {
//     const [open, setOpen] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery"); // Default to cash on delivery
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleOpen = () => {
//         if (userrole !== 'admin') {
//             setOpen(!open);
//         } else {
//             alert("Admins are not allowed to place orders \nLogin as user for placing orders");
//         }
//     };

//     const handleCancel = () => {
//         setOpen(false);
//         navigate('/cart');
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setAddressInfo({ ...addressInfo, [name]: value });
//     };

//     const handlePaymentMethodChange = (e) => {
//         const selectedPaymentMethod = e.target.value;
//         if (selectedPaymentMethod !== "cash_on_delivery") {
//             setPaymentMethod("cash_on_delivery");
//             // Inform the buyer that only cash on delivery is available
//             alert("Currently, only cash on delivery is available.");
//         } else {
//             setPaymentMethod(selectedPaymentMethod);
//         }
//     };

//     const validateInputs = () => {
//         const newErrors = {};
//         if (!addressInfo.name) newErrors.name = "Name is required";
//         if (!addressInfo.address) newErrors.address = "Address is required";
//         if (!addressInfo.pincode) newErrors.pincode = "Pincode is required";
//         if (!addressInfo.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
//         if (addressInfo.mobileNumber && !/^\d{10}$/.test(addressInfo.mobileNumber)) {
//             newErrors.mobileNumber = "Mobile number must be 10 digits";
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = () => {
//         if (validateInputs()) {
//             handleOpen();
//             buyNowFunction();
//             toast.success("Order placed succesfully");
//             toast.success("Thankyou for placing order");

//         }
//     };

//     return (
//         <>
//             <Button
//                 type="button"
//                 onClick={handleOpen}
//                 className="w-full px-4 py-3 text-center text-white bg-pink-600 border border-transparent hover:bg-pink-700 rounded-xl transition duration-100 ease-in-out"
//             >
//                 Buy Now
//             </Button>
//             <Dialog open={open} handler={handleOpen} className="bg-white rounded-xl border-4 border-pink-600 shadow-lg max-w-lg mx-auto p-6">
//                 <DialogBody className="flex flex-col space-y-4 m-2">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
//                     {/* Address input fields */}
//                     <input
//                         type="text"
//                         name="name"
//                         value={addressInfo.name}
//                         onChange={handleAddressChange}
//                         placeholder="Enter your full name"
//                         className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
//                     />
//                     {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//                     <input
//                         type="text"
//                         name="address"
//                         value={addressInfo.address}
//                         onChange={handleAddressChange}
//                         placeholder="Enter your full address"
//                         className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
//                     />
//                     {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
//                     <input
//                         type="number"
//                         name="pincode"
//                         value={addressInfo.pincode}
//                         onChange={handleAddressChange}
//                         placeholder="Enter your pincode"
//                         className={`w-full px-4 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
//                     />
//                     {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
//                     <input
//                         type="text"
//                         name="mobileNumber"
//                         value={addressInfo.mobileNumber}
//                         onChange={handleAddressChange}
//                         placeholder="Enter your mobile number"
//                         className={`w-full px-4 py-2 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500`}
//                     />
//                     {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}

//                     {/* Payment method section */}
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h2>
//                     <div className="flex flex-col space-y-2">
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="credit_card"
//                                 checked={paymentMethod === "credit_card"}
//                                 onChange={handlePaymentMethodChange}
//                             />
//                             <span>Credit Card</span>
//                         </label>
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="paypal"
//                                 checked={paymentMethod === "paypal"}
//                                 onChange={handlePaymentMethodChange}
//                             />
//                             <span>PayPal</span>
//                         </label>
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="bank_transfer"
//                                 checked={paymentMethod === "bank_transfer"}
//                                 onChange={handlePaymentMethodChange}
//                             />
//                             <span>Bank Transfer</span>
//                         </label>
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="cash_on_delivery"
//                                 checked={paymentMethod === "cash_on_delivery"}
//                                 onChange={handlePaymentMethodChange}
//                             />
//                             <span>Cash On Delivery</span>
//                         </label>
//                     </div>
                    
//                     <div className="flex justify-between space-x-4 mt-4">
//                         <Button
//                             type="button"
//                             onClick={handleCancel}
//                             className="w-full px-4 py-3 text-center text-white bg-gray-600 border border-transparent hover:bg-gray-700 rounded-lg transition duration-100 ease-in-out"
//                         >
//                             Go to Cart
//                         </Button>
//                         <Button
//                             type="button"
//                             onClick={handleSubmit}
//                             className="w-full px-4 py-3 text-center text-white bg-pink-600 border border-transparent hover:bg-pink-700 rounded-lg transition duration-100 ease-in-out"
//                         >
//                             Buy Now
//                         </Button>
//                     </div>
//                 </DialogBody>
//             </Dialog>
//         </>
//     );
// };
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import React, { useState } from "react";
import PhonePePayment from "../payment/PhonePePayment";
import { PhonePeIcon } from "../payment/PhonePeIcon";
import { useSelector } from "react-redux";

const BuyNowModal = ({
    addressInfo,
    setAddressInfo,
    buyNowFunction,
    userrole,
    open,
    setOpen,
    cartItems = [], // Add cartItems prop
    totalAmount = 0 // Add totalAmount prop
}) => {
    const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
    const [errors, setErrors] = useState({});
    const [phonePeOpen, setPhonePeOpen] = useState(false);

    const handleOpen = () => {
        if (userrole !== "admin") {
            setOpen(!open);
        } else {
            alert("Admins are not allowed to place orders.\nLogin as user to place an order.");
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        const selected = e.target.value;
        
        // Check if user is trying to select disabled payment methods
        if (selected === "credit_card" || selected === "paypal" || selected === "bank_transfer") {
            toast.error("Currently only PhonePe and Cash on Delivery are available.");
            return; // Don't change the payment method
        }
        
        setPaymentMethod(selected);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!addressInfo.name) newErrors.name = "Name is required";
        if (!addressInfo.address) newErrors.address = "Address is required";
        if (!addressInfo.pincode) newErrors.pincode = "Pincode is required";
        if (!addressInfo.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
        if (addressInfo.mobileNumber && !/^\d{10}$/.test(addressInfo.mobileNumber)) {
            newErrors.mobileNumber = "Mobile number must be 10 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (userrole === "admin") {
            alert("Admins are not allowed to place orders.\nLogin as user to place an order.");
            return;
        }
        
        if (!validateInputs()) {
            return;
        }

        if (paymentMethod === "phonepe") {
            // Open PhonePe payment modal
            setPhonePeOpen(true);
            setOpen(false);
        } else {
            // Handle other payment methods (cash on delivery, etc.)
            setOpen(false);
            buyNowFunction();
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            });
            toast.success("Thank you for placing the order");
        }
    };

    // Calculate total amount including tax
    const calculateTotal = () => {
        if (totalAmount > 0) {
            // Add 7% tax (0.7% as shown in the cart)
            return Math.round(totalAmount * 1.007);
        }
        // Fallback calculation from cart items
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return Math.round(subtotal * 1.007);
    };

    const handlePhonePeSuccess = () => {
        setPhonePeOpen(false);
        setAddressInfo({
            name: "",
            address: "",
            pincode: "",
            mobileNumber: "",
        });
        toast.success("Payment successful! Order placed successfully.");
    };

    const handlePhonePeFailure = (error) => {
        setPhonePeOpen(false);
        toast.error("Payment failed. Please try again.");
    };

    // Get user info from localStorage
    const getUserInfo = () => {
        try {
            const user = localStorage.getItem('users');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    };

    return (
        <>
            {/* Render BuyNow modal only if PhonePe modal is not open */}
            {!phonePeOpen && open && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl border-4 border-pink-600 shadow-2xl max-w-md w-11/12 mx-auto p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={handleCancel}
                            className="absolute top-2 right-2 text-pink-500 hover:text-pink-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={handleAddressChange}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md mb-2`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={handleAddressChange}
                            placeholder="Enter your full address"
                            className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md mb-2`}
                        />
                        {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={handleAddressChange}
                            placeholder="Enter your pincode"
                            className={`w-full px-4 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md mb-2`}
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mb-2">{errors.pincode}</p>}

                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={handleAddressChange}
                            placeholder="Enter your mobile number"
                            className={`w-full px-4 py-2 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4`}
                        />
                        {errors.mobileNumber && <p className="text-red-500 text-sm mb-4">{errors.mobileNumber}</p>}

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                        <div className="flex flex-col space-y-3 mb-6">
                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="phonepe"
                                    checked={paymentMethod === "phonepe"}
                                    onChange={handlePaymentMethodChange}
                                    className="text-blue-600"
                                />
                                <span className="flex items-center text-blue-600 font-medium">
                                    <PhonePeIcon className="w-5 h-5 mr-2" /> 
                                    PhonePe
                                </span>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit_card"
                                    checked={paymentMethod === "credit_card"}
                                    onChange={handlePaymentMethodChange}
                                    disabled
                                    className="text-gray-400"
                                />
                                <div className="flex items-center space-x-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                                    </svg>
                                    <span className="font-medium text-gray-400">Credit Card</span>
                                    <span className="text-xs text-gray-500">(Coming Soon)</span>
                                </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={handlePaymentMethodChange}
                                    disabled
                                    className="text-gray-400"
                                />
                                <div className="flex items-center space-x-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 12.5l3-3-3-3-1.5 1.5L8.5 9.5 7 8l1.5-1.5L8.5 5l3 3-3 3-1.5-1.5L8.5 9.5z"/>
                                    </svg>
                                    <span className="font-medium text-gray-400">PayPal</span>
                                    <span className="text-xs text-gray-500">(Coming Soon)</span>
                                </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank_transfer"
                                    checked={paymentMethod === "bank_transfer"}
                                    onChange={handlePaymentMethodChange}
                                    disabled
                                    className="text-gray-400"
                                />
                                <div className="flex items-center space-x-2">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                                    </svg>
                                    <span className="font-medium text-gray-400">Bank Transfer</span>
                                    <span className="text-xs text-gray-500">(Coming Soon)</span>
                                </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash_on_delivery"
                                    checked={paymentMethod === "cash_on_delivery"}
                                    onChange={handlePaymentMethodChange}
                                    className="text-blue-600"
                                />
                                <div className="flex items-center space-x-2">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium">Cash On Delivery</span>
                                </div>
                            </label>
                        </div>

                        <p className="text-blue-600 text-sm mb-6">Available Payment Methods: PhonePe and Cash on Delivery</p>

                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                Go to Cart
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-200"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Render PhonePe modal only if phonePeOpen is true */}
            {phonePeOpen && (
                <PhonePePayment
                    open={phonePeOpen}
                    setOpen={setPhonePeOpen}
                    amount={calculateTotal()}
                    orderInfo={{ addressInfo, cartItems }}
                    onPaymentSuccess={handlePhonePeSuccess}
                    onPaymentFailure={handlePhonePeFailure}
                />
            )}
        </>
    );
};

export default BuyNowModal;
