import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { PhonePeIcon } from './PhonePeIcon';
import { initializePhonePePayment } from '../../utils/phonePeUtils';

const PhonePePayment = ({ 
    open, 
    setOpen, 
    amount, 
    orderInfo, 
    onPaymentSuccess, 
    onPaymentFailure 
}) => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [paymentStep, setPaymentStep] = useState('init'); // init, processing, redirecting

    useEffect(() => {
        // Add class to body to prevent scrolling when modal is open
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    // Initialize PhonePe payment
    const handlePayment = async () => {
        setLoading(true);
        setPaymentStep('processing');
        
        try {
            console.log('Initializing PhonePe payment for amount:', amount);
            console.log('Order info:', orderInfo);
            
            const result = await initializePhonePePayment(orderInfo, amount);
            
            if (result.success) {
                console.log('Payment initialization successful:', result);
                setPaymentStep('redirecting');
                
                // Store transaction details in localStorage for callback handling
                localStorage.setItem('phonepe_transaction', JSON.stringify({
                    transactionId: result.transactionId,
                    orderInfo: orderInfo,
                    amount: amount
                }));

                // Show success message before redirect
                toast.success('Payment initiated successfully! Redirecting to PhonePe...', {
                    duration: 3000,
                    style: {
                        background: '#ec4899',
                        color: '#fff',
                        zIndex: 999999,
                    },
                });
                
                // Small delay to show the success message
                setTimeout(() => {
                    // Redirect to PhonePe payment page
                    window.location.href = result.redirectUrl;
                }, 1500);
            } else {
                console.error('Payment initialization failed:', result.error);
                throw new Error(result.error || 'Payment initialization failed');
            }
        } catch (error) {
            console.error('PhonePe payment error:', error);
            toast.error('Payment initialization failed. Please try again.', {
                duration: 4000,
                style: {
                    background: '#ef4444',
                    color: '#fff',
                    zIndex: 999999,
                },
            });
            setPaymentStatus('failed');
            setPaymentStep('init');
            onPaymentFailure && onPaymentFailure(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle payment cancellation
    const handleCancel = () => {
        setOpen(false);
        setPaymentStatus('pending');
        setPaymentStep('init');
        onPaymentFailure && onPaymentFailure(new Error('Payment cancelled by user'));
    };

    if (!open) return null;

    return (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleCancel}
        >
            <div 
                className="relative bg-white rounded-2xl border-2 border-blue-600 shadow-2xl p-8 w-11/12 max-w-md mx-auto my-auto transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <PhonePeIcon className="w-16 h-16" />
                        </div>
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">PhonePe Payment</h2>
                        <p className="text-gray-600 text-sm">
                            {paymentStep === 'init' && 'Complete your payment securely with PhonePe'}
                            {paymentStep === 'processing' && 'Initializing PhonePe payment...'}
                            {paymentStep === 'redirecting' && 'Redirecting to PhonePe...'}
                        </p>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 text-sm font-medium">Order Amount:</span>
                            <span className="font-bold text-xl text-blue-600">₹{amount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 text-sm font-medium">Payment Method:</span>
                            <span className="font-semibold text-blue-600 text-sm flex items-center">
                                <PhonePeIcon className="w-4 h-4 mr-1" />
                                PhonePe
                            </span>
                        </div>
                    </div>

                    {/* Content based on payment step */}
                    {paymentStep === 'init' && (
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span>Secure payment gateway</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span>Instant payment confirmation</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <span>UPI, Cards, Net Banking supported</span>
                            </div>
                        </div>
                    )}

                    {paymentStep === 'processing' && (
                        <div className="text-center py-6">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                                <PhonePeIcon className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <p className="text-gray-600 text-sm">Initializing PhonePe payment gateway...</p>
                        </div>
                    )}

                    {paymentStep === 'redirecting' && (
                        <div className="text-center py-6">
                            <div className="animate-pulse">
                                <PhonePeIcon className="w-16 h-16 mx-auto mb-4" />
                            </div>
                            <p className="text-gray-600 text-sm">Redirecting to PhonePe...</p>
                            <p className="text-xs text-gray-500 mt-2">Please wait while we redirect you to PhonePe</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {paymentStep === 'init' && (
                        <div className="flex space-x-3 pt-2">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition duration-200 text-sm font-medium"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePayment}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 text-sm font-medium shadow-lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    `Pay ₹${amount}`
                                )}
                            </button>
                        </div>
                    )}

                    {/* Error Message */}
                    {paymentStatus === 'failed' && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <p className="text-red-600 text-sm">
                                Payment failed. Please try again or choose a different payment method.
                            </p>
                        </div>
                    )}

                    {/* Demo Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-600 text-xs text-center">
                            <strong>Demo Mode:</strong> Mock payment for testing purposes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhonePePayment; 