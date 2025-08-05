import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import Layout from '../../components/layout/Layout';
import { PhonePeIcon } from '../../components/payment/PhonePeIcon';

const PaymentCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('processing');
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const handlePaymentCallback = async () => {
            try {
                console.log('Payment callback triggered');
                console.log('Search params:', Object.fromEntries(searchParams.entries()));
                
                // Get transaction details from localStorage
                const transactionData = localStorage.getItem('phonepe_transaction');
                console.log('Transaction data from localStorage:', transactionData);
                
                if (!transactionData) {
                    console.error('No transaction data found in localStorage');
                    setPaymentStatus('error');
                    toast.error('Transaction details not found');
                    return;
                }

                const { transactionId, orderInfo, amount } = JSON.parse(transactionData);
                console.log('Parsed transaction data:', { transactionId, orderInfo, amount });
                
                // Get PhonePe response parameters
                const code = searchParams.get('code');
                const merchantTransactionId = searchParams.get('merchantTransactionId');
                const transactionIdFromPhonePe = searchParams.get('transactionId');
                const amountFromPhonePe = searchParams.get('amount');
                const redirectMode = searchParams.get('redirectMode');
                const status = searchParams.get('status');

                console.log('PhonePe response parameters:', {
                    code,
                    merchantTransactionId,
                    transactionIdFromPhonePe,
                    amountFromPhonePe,
                    redirectMode,
                    status
                });

                // Verify transaction ID matches
                if (merchantTransactionId && merchantTransactionId !== transactionId) {
                    console.error('Transaction ID mismatch:', { merchantTransactionId, transactionId });
                    setPaymentStatus('error');
                    toast.error('Transaction ID mismatch');
                    return;
                }

                // Check payment status based on PhonePe response
                if (code === 'PAYMENT_SUCCESS' || status === 'SUCCESS') {
                    console.log('Payment successful, creating order...');
                    
                    // Payment successful - save order to Firebase
                    const orderData = {
                        ...orderInfo,
                        paymentMethod: 'PhonePe',
                        paymentStatus: 'completed',
                        transactionId: transactionIdFromPhonePe || `PHONEPE_${transactionId}`,
                        phonepeTransactionId: merchantTransactionId || transactionId,
                        paymentAmount: amountFromPhonePe ? amountFromPhonePe / 100 : amount, // Convert from paise
                        paymentTime: Timestamp.now(),
                        status: 'confirmed',
                        time: Timestamp.now(),
                        date: new Date().toLocaleString(
                            "en-US",
                            {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }
                        )
                    };

                    console.log('Order data to save:', orderData);

                    try {
                        const docRef = await addDoc(collection(fireDB, 'order'), orderData);
                        console.log('Order saved successfully with ID:', docRef.id);
                        
                        setPaymentStatus('success');
                        setOrderDetails(orderData);
                        toast.success('Payment successful! Order placed successfully.');
                        
                        // Clear transaction data from localStorage
                        localStorage.removeItem('phonepe_transaction');
                        
                        // Clear cart after successful payment
                        localStorage.removeItem('cart');
                        localStorage.removeItem('anonymousCart');
                        
                    } catch (error) {
                        console.error('Error saving order:', error);
                        setPaymentStatus('error');
                        toast.error('Payment successful but order could not be saved. Please contact support.');
                    }
                } else if (code === 'PAYMENT_ERROR' || status === 'FAILED') {
                    console.log('Payment failed');
                    setPaymentStatus('error');
                    toast.error('Payment failed. Please try again.');
                } else if (code === 'USER_CANCELLED' || status === 'CANCELLED') {
                    console.log('Payment cancelled by user');
                    setPaymentStatus('cancelled');
                    toast.error('Payment was cancelled by user.');
                } else {
                    console.log('Unknown payment status:', { code, status });
                    setPaymentStatus('error');
                    toast.error('Unknown payment status. Please contact support.');
                }

            } catch (error) {
                console.error('Payment callback error:', error);
                setPaymentStatus('error');
                toast.error('Error processing payment callback');
            }
        };

        handlePaymentCallback();
    }, [searchParams]);

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleViewOrders = () => {
        navigate('/user-dashboard');
    };

    const renderPaymentStatus = () => {
        switch (paymentStatus) {
            case 'processing':
                return (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
                        <p className="text-gray-600">Please wait while we verify your payment...</p>
                    </div>
                );

            case 'success':
                return (
                    <div className="text-center">
                        <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
                        
                        {orderDetails && (
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                                <h3 className="font-semibold text-gray-800 mb-2">Order Details:</h3>
                                <p className="text-sm text-gray-600">Transaction ID: {orderDetails.transactionId}</p>
                                <p className="text-sm text-gray-600">Amount: ₹{orderDetails.paymentAmount}</p>
                                <p className="text-sm text-gray-600">Payment Method: PhonePe</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={handleViewOrders}
                                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
                            >
                                View My Orders
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                );

            case 'error':
                return (
                    <div className="text-center">
                        <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">Something went wrong with your payment. Please try again.</p>
                        
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                );

            case 'cancelled':
                return (
                    <div className="text-center">
                        <div className="bg-yellow-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
                        <p className="text-gray-600 mb-6">You cancelled the payment. No charges were made.</p>
                        
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-200"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-200"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <PhonePeIcon className="w-16 h-16" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Payment Status</h1>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {renderPaymentStatus()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentCallback; 