import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    saveCartToFirebase, 
    loadCartFromFirebase, 
    mergeAnonymousCartWithUserCart,
    getCurrentUser,
    isUserAuthenticated 
} from '../utils/cartUtils';
import { 
    loadCartFromFirebase as loadCartAction,
    initializeAnonymousCart,
    saveAnonymousCart
} from '../redux/cartSlice';

export const useCartPersistence = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const currentUser = getCurrentUser();
    const isInitialized = useRef(false);
    const isAuthenticated = isUserAuthenticated();

    // Initialize cart on app start
    useEffect(() => {
        if (isInitialized.current) return;
        
        const initializeCart = async () => {
            console.log('Initializing cart persistence...');
            console.log('Is authenticated:', isAuthenticated);
            console.log('Current user:', currentUser?.uid);
            
            if (isAuthenticated && currentUser?.uid) {
                // User is authenticated, load their cart from Firebase
                try {
                    const userCart = await loadCartFromFirebase(currentUser.uid);
                    dispatch(loadCartAction(userCart));
                    console.log('User cart loaded from Firebase:', userCart.length, 'items');
                } catch (error) {
                    console.error('Error loading user cart:', error);
                    dispatch(loadCartAction([]));
                }
            } else {
                // User is anonymous, load cart from localStorage
                dispatch(initializeAnonymousCart());
                console.log('Anonymous cart loaded from localStorage');
            }
            isInitialized.current = true;
        };

        initializeCart();
    }, [dispatch, isAuthenticated, currentUser?.uid]);

    // Save cart when it changes
    useEffect(() => {
        if (!isInitialized.current) return;

        const saveCart = async () => {
            console.log('Saving cart...', cartItems.length, 'items');
            
            if (isAuthenticated && currentUser?.uid) {
                // Save authenticated user's cart to Firebase
                try {
                    await saveCartToFirebase(currentUser.uid, cartItems);
                    console.log('Cart saved to Firebase for user:', currentUser.uid);
                } catch (error) {
                    console.error('Error saving user cart to Firebase:', error);
                }
            } else {
                // Save anonymous user's cart to localStorage
                dispatch(saveAnonymousCart());
                console.log('Cart saved to localStorage for anonymous user');
            }
        };

        saveCart();
    }, [cartItems, isAuthenticated, currentUser?.uid, dispatch]);

    // Handle user authentication state changes
    const handleUserLogin = async (userId) => {
        console.log('Handling user login for:', userId);
        try {
            // Get anonymous cart before clearing it
            const anonymousCart = JSON.parse(localStorage.getItem('anonymousCart') || '[]');
            console.log('Anonymous cart before merge:', anonymousCart.length, 'items');
            
            // Merge anonymous cart with user's existing cart
            const mergedCart = await mergeAnonymousCartWithUserCart(userId, anonymousCart);
            
            // Update Redux store with merged cart
            dispatch(loadCartAction(mergedCart));
            
            console.log('Cart merged successfully after login:', mergedCart.length, 'items');
            return mergedCart;
        } catch (error) {
            console.error('Error handling user login:', error);
            // Fallback: just load user's cart
            const userCart = await loadCartFromFirebase(userId);
            dispatch(loadCartAction(userCart));
            return userCart;
        }
    };

    const handleUserLogout = () => {
        console.log('Handling user logout');
        // Clear the cart from Redux store
        dispatch(loadCartAction([]));
        // Initialize anonymous cart
        dispatch(initializeAnonymousCart());
        console.log('Cart cleared for logout');
    };

    return {
        handleUserLogin,
        handleUserLogout,
        isInitialized: isInitialized.current
    };
}; 