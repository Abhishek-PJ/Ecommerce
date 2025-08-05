import { createSlice } from '@reduxjs/toolkit';

<<<<<<< HEAD
// Initialize cart from localStorage, but we'll handle user-specific loading separately
const initialState = [];
=======
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
<<<<<<< HEAD
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteFromCart(state, action) {
            const index = state.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                if (state[index].quantity > 1) {
                    state[index].quantity -= 1;
                } else {
                    state.splice(index, 1); // remove the item if quantity is 1
                }
            }
=======
            state.push(action.payload);
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
<<<<<<< HEAD
            } else if (item) {
                // remove item completely if quantity is 1
                return state.filter(i => i.id !== action.payload);
=======
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
            }
        },
        clearCart() {
            return [];
        },
<<<<<<< HEAD
        loadCartFromFirebase(state, action) {
            return action.payload || [];
        },
        setCart(state, action) {
            return action.payload;
        },
        removeFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        // New action to initialize cart for anonymous users
        initializeAnonymousCart(state) {
            const savedCart = localStorage.getItem('anonymousCart');
            if (savedCart) {
                try {
                    return JSON.parse(savedCart);
                } catch (error) {
                    console.error('Error parsing anonymous cart:', error);
                    return [];
                }
            }
            return [];
        },
        // New action to save anonymous cart
        saveAnonymousCart(state) {
            localStorage.setItem('anonymousCart', JSON.stringify(state));
        }
    },
});

export const {
    addToCart,
    deleteFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    loadCartFromFirebase,
    setCart,
    removeFromCart,
    initializeAnonymousCart,
    saveAnonymousCart
} = cartSlice.actions;
=======
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7

export default cartSlice.reducer;
