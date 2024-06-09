import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;
    const [loadedOrders, setLoadedOrders] = useState([]);

    // Load orders initially and whenever getAllOrder changes
    useEffect(() => {
        if (getAllOrder.length > 0) {
            const initialOrders = getAllOrder.slice(0, 10); // Adjust the number of initial orders to load
            setLoadedOrders(initialOrders);
        }
    }, [getAllOrder]);

    // Function to load more orders
    const loadMoreOrders = () => {
        const remainingOrders = getAllOrder.slice(loadedOrders.length, loadedOrders.length + 10); // Load additional 10 orders
        setLoadedOrders(prevOrders => [...prevOrders, ...remainingOrders]);
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="text-xl text-pink-600 font-bold text-center my-4">All Orders</h1>
            {loadedOrders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <table className="w-full border-collapse border border-pink-100">
                    <thead>
                        <tr className="bg-pink-100 text-pink-600 font-semibold">
                            <th>ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Email</th>
                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {loadedOrders.map((order, index) => (
                            <tr key={index} className="border-b border-pink-100">
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                                <td>{order.email}</td>
                                {/* Add more table cells to display other order details */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Load more button */}
            {loadedOrders.length < getAllOrder.length && (
                <div className="flex justify-center mt-4">
                    <button onClick={loadMoreOrders} className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                        Load More Orders
                    </button>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;
