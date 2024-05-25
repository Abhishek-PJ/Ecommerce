/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleCancel = () => {
        setOpen(false);
        // Add cancel order logic here
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl transition duration-300 ease-in-out"
            >
                Buy Now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-pink-100 max-w-md mx-auto">
                <DialogBody className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={addressInfo.name}
                        onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="input-field border border-black rounded-lg"
                    />
                    <input
                        type="text"
                        name="address"
                        value={addressInfo.address}
                        onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                        placeholder="Enter your full address"
                        className="input-field border border-black rounded-lg"
                    />
                    <input
                        type="number"
                        name="pincode"
                        value={addressInfo.pincode}
                        onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                        placeholder="Enter your pincode"
                        className="input-field border border-black rounded-lg"
                    />
                    <input
                        type="text"
                        name="mobileNumber"
                        value={addressInfo.mobileNumber}
                        onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
                        placeholder="Enter your mobile number"
                        className="input-field border border-black rounded-lg"
                    />
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-gray-600 border border-transparent hover:border-gray-300 hover:bg-gray-700 rounded-lg transition duration-100 ease-in-out"
                        >
                            Go Back
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent hover:border-pink-500 hover:bg-green-500 rounded-lg transition duration-100 ease-in-out"
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
