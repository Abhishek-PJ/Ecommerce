/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery"); // Default to cash on delivery
    const navigate = useNavigate();

    const handleOpen = () => setOpen(!open);

    const handleCancel = () => {
        setOpen(false);
        navigate('/cart');
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        const selectedPaymentMethod = e.target.value;
        if (selectedPaymentMethod !== "cash_on_delivery") {
            setPaymentMethod("cash_on_delivery");
            // Inform the buyer that only cash on delivery is available
            alert("Currently, only cash on delivery is available.");
        } else {
            setPaymentMethod(selectedPaymentMethod);
        }
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-white bg-pink-600 border border-transparent hover:bg-pink-700 rounded-xl transition duration-100 ease-in-out"
            >
                Buy Now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-pink-100 rounded-xl  border-pink-600  border-4 shadow-lg max-w-lg mx-auto p-6 ">
                <DialogBody className="flex flex-col space-y-4 m-2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
                    {/* Address input fields */}
                    <input
                        type="text"
                        name="name"
                        value={addressInfo.name}
                        onChange={handleAddressChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="address"
                        value={addressInfo.address}
                        onChange={handleAddressChange}
                        placeholder="Enter your full address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="number"
                        name="pincode"
                        value={addressInfo.pincode}
                        onChange={handleAddressChange}
                        placeholder="Enter your pincode"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="mobileNumber"
                        value={addressInfo.mobileNumber}
                        onChange={handleAddressChange}
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    {/* Rest of the sections */}

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                    <div className="flex flex-col space-y-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="credit_card"
                                checked={paymentMethod === "credit_card"}
                                onChange={handlePaymentMethodChange}
                            />
                            <span>Credit Card</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="paypal"
                                checked={paymentMethod === "paypal"}
                                onChange={handlePaymentMethodChange}
                            />
                            <span>PayPal</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bank_transfer"
                                checked={paymentMethod === "bank_transfer"}
                                onChange={handlePaymentMethodChange}
                            />
                            <span>Bank Transfer</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash_on_delivery"
                                checked={paymentMethod === "cash_on_delivery"}
                                onChange={handlePaymentMethodChange}
                            />
                            <span>Cash On Delivery</span>
                        </label>
                    </div>
                    
                    <div className="flex justify-between space-x-4 mt-4">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="w-full px-4 py-3 text-center text-white bg-gray-600 border border-transparent hover:bg-gray-700 rounded-lg transition duration-100 ease-in-out"
                        >
                            Go to Cart
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-white bg-pink-600 border border-transparent hover:bg-pink-700 rounded-lg transition duration-100 ease-in-out"
                        >
                            Buy Now
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default BuyNowModal;
