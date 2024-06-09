import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id != action.payload.id);
        },
        incrementQuantity(state, action) {
            state = state.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },
        decrementQuantity(state, action) {
            state = state.map(item => {
                if (item.quantity !== 1) {
                    if (item.id === action.payload) {
                        item.quantity--;
                    }
                }
                return item;
            });
        },
        clearCart(state) {
            // Set the state to an empty array to clear the cart
            return [];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

