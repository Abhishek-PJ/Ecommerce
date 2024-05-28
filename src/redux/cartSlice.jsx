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

// import { createSlice } from '@reduxjs/toolkit';
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
// import { fireDB } from '../../firebase/FirebaseConfig'; // Assuming you have Firebase initialized in FirebaseConfig

// const initialState = [];

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         setCart: (state, action) => {
//             return action.payload; // Set the cart data from Firestore
//         },
//         addToCart: (state, action) => {
//             state.push(action.payload);
//         },
//         deleteFromCart: (state, action) => {
//             return state.filter(item => item.id !== action.payload.id);
//         },
//         incrementQuantity: (state, action) => {
//             state.forEach(item => {
//                 if (item.id === action.payload) {
//                     item.quantity++;
//                 }
//             });
//         },
//         decrementQuantity: (state, action) => {
//             state.forEach(item => {
//                 if (item.quantity !== 1) {
//                     if (item.id === action.payload) {
//                         item.quantity--;
//                     }
//                 }
//             });
//         },
//     },
// });

// export const { setCart, addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

// // Thunk action to fetch cart data from Firestore
// export const fetchCartData = (userId) => async (dispatch) => {
//     try {
//         const docRef = doc(fireDB, 'users', userId, 'cart');
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             dispatch(setCart(docSnap.data().items));
//         }
//     } catch (error) {
//         console.error('Error fetching cart data:', error);
//     }
// };

// // Thunk action to update cart data in Firestore
// export const updateCartData = (userId, cartData) => async () => {
//     try {
//         const docRef = doc(fireDB, 'users', userId, 'cart');
//         await setDoc(docRef, { items: cartData });
//     } catch (error) {
//         console.error('Error updating cart data:', error);
//     }
// };

// export default cartSlice.reducer;
