import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, getDocs, where } from 'firebase/firestore';
import { fireDB, auth } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { loadCartFromFirebase as loadCartFromFirebaseUtil } from '../utils/cartUtils';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllProductFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "products"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const productArray = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllOrderFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "order"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const orderArray = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                // console.log("Fetched Orders:", orderArray);
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllUserFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "user"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const userArray = QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setGetAllUser(userArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Function to load user's cart from Firebase
    const loadUserCart = async (userId) => {
        try {
            const cartData = await loadCartFromFirebaseUtil(userId);
            return cartData;
        } catch (error) {
            console.error('Error loading user cart:', error);
            return [];
        }
    };

    // Function to refresh user data from Firestore
    const refreshUserData = async (uid) => {
        try {
            const q = query(collection(fireDB, "user"), where('uid', '==', uid));
            const querySnapshot = await getDocs(q);
            let userData = null;
            querySnapshot.forEach((doc) => {
                userData = doc.data();
            });
            
            if (userData) {
                localStorage.setItem("users", JSON.stringify(userData));
                toast.success("User data refreshed successfully!");
                return userData;
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
            toast.error("Failed to refresh user data");
        }
        return null;
    };

    useEffect(() => {
        const productUnsubscribe = getAllProductFunction();
        const orderUnsubscribe = getAllOrderFunction();
        const userUnsubscribe = getAllUserFunction();

        const authUnsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user); // directly set from Firebase
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            productUnsubscribe();
            orderUnsubscribe();
            userUnsubscribe();
            authUnsubscribe();
        };
    }, []);

    const orderDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const cancelOrder = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllOrder,
            orderDelete,
            cancelOrder,
            getAllUser,
            currentUser,
            setCurrentUser,
            getAllProductFunction,
            loadUserCart,
            refreshUserData
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
