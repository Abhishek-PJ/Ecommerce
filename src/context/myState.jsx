import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB, auth } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "products"), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "order"), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const orderDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', id));
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "user"), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const storedUser = JSON.parse(localStorage.getItem("users"));
                setCurrentUser(storedUser);
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrder,
            orderDelete,
            getAllUser,
            currentUser,
            setCurrentUser
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
