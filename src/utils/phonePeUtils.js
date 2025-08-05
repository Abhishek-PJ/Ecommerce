// PhonePe Payment Utility Functions - Mock Implementation for Testing

// PhonePe API Configuration - Mock for testing
export const PHONEPE_CONFIG = {
    MERCHANT_ID: 'PGTESTPAYUAT',
    SALT_KEY: '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399',
    SALT_INDEX: '1',
    BASE_URL: 'https://api-preprod.phonepe.com/apis/hermes',
    REDIRECT_URL: 'http://localhost:5173/payment/callback' // Updated to correct port
};

// Generate unique transaction ID
export const generateTransactionId = () => {
    return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Convert string to base64 (browser compatible)
const stringToBase64 = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
};

// Generate SHA256 hash (browser compatible)
const generateSHA256 = async (data) => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
};

// Generate checksum for PhonePe
export const generateChecksum = async (payload) => {
    try {
        const base64 = stringToBase64(JSON.stringify(payload));
        const string = base64 + '/pg/v1/pay' + PHONEPE_CONFIG.SALT_KEY;
        const sha256 = await generateSHA256(string);
        const checksum = sha256 + '###' + PHONEPE_CONFIG.SALT_INDEX;
        return checksum;
    } catch (error) {
        console.error('Error generating checksum:', error);
        throw error;
    }
};

// Verify PhonePe response checksum
export const verifyChecksum = async (response, checksum) => {
    try {
        const string = response + PHONEPE_CONFIG.SALT_KEY;
        const sha256 = await generateSHA256(string);
        const calculatedChecksum = sha256 + '###' + PHONEPE_CONFIG.SALT_INDEX;
        return calculatedChecksum === checksum;
    } catch (error) {
        console.error('Error verifying checksum:', error);
        return false;
    }
};

// Create PhonePe payment payload
export const createPaymentPayload = (orderInfo, amount) => {
    const transactionId = generateTransactionId();
    
    return {
        merchantId: PHONEPE_CONFIG.MERCHANT_ID,
        merchantTransactionId: transactionId,
        merchantUserId: orderInfo.userid || 'MUID' + Date.now(),
        amount: amount * 100, // Convert to paise
        redirectUrl: PHONEPE_CONFIG.REDIRECT_URL,
        redirectMode: 'REDIRECT',
        callbackUrl: PHONEPE_CONFIG.REDIRECT_URL,
        mobileNumber: orderInfo.addressInfo?.mobileNumber || '',
        paymentInstrument: {
            type: 'PAY_PAGE'
        },
        merchantOrderId: 'ORDER_' + Date.now(),
        message: 'Payment for order',
        email: orderInfo.email || '',
        shortName: 'E-Commerce Store',
        name: orderInfo.addressInfo?.name || 'Customer',
        logoUrl: 'https://example.com/logo.png',
        apiVersion: 'v4'
    };
};

// Mock PhonePe payment initialization for testing
export const initializePhonePePayment = async (orderInfo, amount) => {
    try {
        console.log('Creating payment payload for amount:', amount);
        const payload = createPaymentPayload(orderInfo, amount);
        console.log('Payment payload:', payload);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful response with proper redirect URL
        const mockResponse = {
            success: true,
            code: 'PAYMENT_INITIATED',
            message: 'Payment initiated successfully',
            data: {
                merchantId: PHONEPE_CONFIG.MERCHANT_ID,
                merchantTransactionId: payload.merchantTransactionId,
                instrumentResponse: {
                    type: 'PAY_PAGE',
                    redirectInfo: {
                        url: `${PHONEPE_CONFIG.REDIRECT_URL}?code=PAYMENT_SUCCESS&merchantTransactionId=${payload.merchantTransactionId}&transactionId=PHONEPE_${payload.merchantTransactionId}&amount=${payload.amount}&redirectMode=REDIRECT&status=SUCCESS`
                    }
                }
            }
        };

        console.log('Mock PhonePe response:', mockResponse);

        if (mockResponse.success) {
            return {
                success: true,
                redirectUrl: mockResponse.data.instrumentResponse.redirectInfo.url,
                transactionId: payload.merchantTransactionId
            };
        } else {
            throw new Error(mockResponse.message || 'Payment initialization failed');
        }
    } catch (error) {
        console.error('PhonePe payment initialization error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Mock payment status check
export const checkPaymentStatus = async (transactionId) => {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock successful payment status
        return {
            success: true,
            code: 'PAYMENT_SUCCESS',
            message: 'Payment successful',
            data: {
                merchantId: PHONEPE_CONFIG.MERCHANT_ID,
                merchantTransactionId: transactionId,
                transactionId: 'PHONEPE_' + transactionId,
                amount: 60100,
                status: 'SUCCESS',
                paymentInstrument: {
                    type: 'UPI',
                    utr: 'UPI' + Date.now()
                }
            }
        };
    } catch (error) {
        console.error('PhonePe status check error:', error);
        throw error;
    }
};

// Format amount for display
export const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
};

// Validate PhonePe response
export const validatePhonePeResponse = (response) => {
    const requiredFields = ['code', 'merchantTransactionId', 'transactionId'];
    const missingFields = requiredFields.filter(field => !response[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    return true;
}; 