import React, { useContext, Fragment } from "react";
import myContext from "../../context/myContext";
import ErrorBoundary from "./ErrorBoundary";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;

    return (
        <ErrorBoundary>
            <div>
                <div className="py-5">
                    <h1 className="text-2xl md:text-3xl text-pink-600 font-bold">All Orders</h1>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                        <thead>
                            <tr>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Order Id</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Title</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Category</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Price</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Quantity</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Total Price</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Status</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Name</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Address</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Pincode</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Phone Number</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Email</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Date</th>
                                <th className="h-12 px-6 text-sm md:text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllOrder.map((order, orderIndex) => (
                                <Fragment key={order.id}>
                                    {order.cartItems.map((item, itemIndex) => (
                                        <tr key={item.id} className="text-slate-600 bg-white hover:bg-slate-50 transition duration-300">
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{itemIndex + 1}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.id}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">
                                                <img className="w-10 h-10 md:w-16 md:h-16 object-cover rounded" src={item.productImageUrl} alt="Product" />
                                            </td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{item.title}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{item.category}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">₹{item.price}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{item.quantity}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">₹{item.price * item.quantity}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l  first:border-l-0 border-pink-100">{order.status}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.name}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.address}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.pincode}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.addressInfo.mobileNumber}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.email}</td>
                                            <td className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100">{order.date}</td>
                                            <td onClick={() => orderDelete(order.id)} className="h-12 px-6 text-sm md:text-md border-t border-l first:border-l-0 border-pink-100 text-red-500 cursor-pointer">Delete</td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default OrderDetail;
