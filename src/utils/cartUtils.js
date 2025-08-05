import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

// Test Firebase connectivity
export const testFirebaseConnection = async () => {
    try {
        // Try to read from a test document
        const testRef = doc(fireDB, 'test', 'connection');
        await getDoc(testRef);
        return true;
    } catch (error) {
        console.error('Firebase connection failed:', error);
        return false;
    }
};

// Save cart to Firebase for a specific user
export const saveCartToFirebase = async (userId, cartItems) => {
    try {
        const userCartRef = doc(fireDB, 'userCarts', userId);
        const cartData = {
            cartItems: cartItems,
            updatedAt: new Date().toISOString()
        };
        await setDoc(userCartRef, cartData);
        console.log('Cart saved to Firebase for user:', userId);
    } catch (error) {
        console.error('Error saving cart to Firebase:', error);
        throw error; // Re-throw to handle in calling function
    }
};

// Load cart from Firebase for a specific user
export const loadCartFromFirebase = async (userId) => {
    try {
        const userCartRef = doc(fireDB, 'userCarts', userId);
        const cartDoc = await getDoc(userCartRef);
        
        if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            console.log('Cart loaded from Firebase for user:', userId);
            return cartData.cartItems || [];
        } else {
            console.log('No cart found in Firebase for user:', userId);
            return [];
        }
    } catch (error) {
        console.error('Error loading cart from Firebase:', error);
        return [];
    }
};

// Update cart in Firebase for a specific user
export const updateCartInFirebase = async (userId, cartItems) => {
    try {
        const userCartRef = doc(fireDB, 'userCarts', userId);
        await updateDoc(userCartRef, {
            cartItems: cartItems,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error updating cart in Firebase:', error);
    }
};

// Merge anonymous cart with user cart when user logs in
export const mergeAnonymousCartWithUserCart = async (userId, anonymousCart) => {
    try {
        if (!anonymousCart || anonymousCart.length === 0) {
            return await loadCartFromFirebase(userId);
        }

        const userCart = await loadCartFromFirebase(userId);
        
        // Create a map of existing user cart items
        const userCartMap = new Map();
        userCart.forEach(item => {
            userCartMap.set(item.id, item);
        });

        // Merge anonymous cart items with user cart
        anonymousCart.forEach(anonymousItem => {
            const existingItem = userCartMap.get(anonymousItem.id);
            if (existingItem) {
                // If item exists in user cart, add quantities
                existingItem.quantity += anonymousItem.quantity;
            } else {
                // If item doesn't exist, add it to user cart
                userCartMap.set(anonymousItem.id, anonymousItem);
            }
        });

        const mergedCart = Array.from(userCartMap.values());
        
        // Save merged cart to Firebase
        await saveCartToFirebase(userId, mergedCart);
        
        // Clear anonymous cart from localStorage
        localStorage.removeItem('anonymousCart');
        
        console.log('Successfully merged anonymous cart with user cart');
        return mergedCart;
    } catch (error) {
        console.error('Error merging carts:', error);
        return await loadCartFromFirebase(userId);
    }
};

// Get current user from localStorage
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('users');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
};

// Check if user is authenticated
export const isUserAuthenticated = () => {
    const user = getCurrentUser();
    return user && user.uid;
}; 