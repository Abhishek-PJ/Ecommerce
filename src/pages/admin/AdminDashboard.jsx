
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import ProductDetail from '../../components/admin/ProductDetail';
// import OrderDetail from '../../components/admin/OrderDetail';
// import UserDetail from '../../components/admin/UserDetail';
// import { useContext } from 'react';
// import myContext from '../../context/myContext';
// import {useNavigate} from "react-router-dom"; 
// import toast from 'react-hot-toast';
// import Layout from '../../components/layout/Layout';



// const AdminDashboard = () => {

//     const user = JSON.parse(localStorage.getItem('users'));
//     const context = useContext(myContext);
//     const {getAllProduct, getAllOrder, getAllUser} = context;

//     let parsedUser = null;

//     if (user) {
//         try {
//             parsedUser = JSON.parse(user);
//         } catch (error) {
//             console.error('Error parsing user data:', error);
//         }
//     }

//     // Navigate
//     const navigate = useNavigate();

//     // Logout function
//     const logout = () => {
//         localStorage.removeItem('users');
//         navigate("/login");
//         toast.success("Loged out");
//     }
    
//     return (
//         <Layout>
//         <div>
//             {/* Top */}
//             <div className="top mb-5 px-5 mt-5">
//                 <div className=" bg-pink-50 py-5 border border-pink-100 rounded-lg flex justify-center items-center">
//                 <h1 className=" text-center text-2xl font-bold text-pink-500">Admin Dashboard</h1>
//                 </div>
                
//             </div>

//             <div className="px-5">
//                 {/* Mid  */}
//                 <div className="mid mb-5">
//                     {/* main  */}
//                     <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
//                         {/* image  */}
//                         <div className="flex justify-center">
//                             <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
//                         </div>
//                         {/* text  */}
//                            <div className="">
//                             {/* Name  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Name : </span>
//                                 {user?.name}
//                             </h1>

//                             {/* Email  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Email : </span>
//                                 {user?.email}
//                             </h1>

//                             {/* Date  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Date : </span>
//                                 {user?.date}
//                             </h1>

//                             {/* Role  */}
//                             <h1 className=" text-center text-lg">
//                                 <span className=" font-bold">Role : </span>
//                                 {user?.role}
//                             </h1>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom */}
//                 <div className="">
//                     <Tabs>
//                         <TabList className="flex flex-wrap -m-4 text-center justify-center">
//                             {/* Total Products */}
//                             <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
//                                 <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl" >
//                                     <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             width={50}
//                                             height={50}
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             className="lucide lucide-shopping-basket"
//                                         >
//                                             <path d="m5 11 4-7" />
//                                             <path d="m19 11-4-7" />
//                                             <path d="M2 11h20" />
//                                             <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
//                                             <path d="m9 11 1 9" />
//                                             <path d="M4.5 15.5h15" />
//                                             <path d="m15 11-1 9" />
//                                         </svg>

//                                     </div>
//                                     <h2 className="title-font font-medium text-3xl text-pink-400 fonts1" >{getAllProduct.length}</h2>
//                                     <p className=" text-pink-500  font-bold" >Total Products</p>
//                                 </div>
//                             </Tab>

//                             {/* Total Order  */}
//                             <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
//                                 <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl" >
//                                     <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             width={50}
//                                             height={50}
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             className="lucide lucide-list-ordered"
//                                         >
//                                             <line x1={10} x2={21} y1={6} y2={6} />
//                                             <line x1={10} x2={21} y1={12} y2={12} />
//                                             <line x1={10} x2={21} y1={18} y2={18} />
//                                             <path d="M4 6h1v4" />
//                                             <path d="M4 10h2" />
//                                             <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
//                                         </svg>
//                                     </div>
//                                     <h2 className="title-font font-medium text-3xl text-pink-400 fonts1" >{getAllOrder.length}</h2>
//                                     <p className=" text-pink-500  font-bold" >Total Order</p>
//                                 </div>
//                             </Tab>

//                             {/* Total User  */}
//                             <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
//                                 <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl" >
//                                     <div className="text-pink-500 w-12 h-12 mb-3 inline-block" >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             width={50}
//                                             height={50}
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             className="lucide lucide-users"
//                                         >
//                                             <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                                             <circle cx={9} cy={7} r={4} />
//                                             <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//                                             <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                                         </svg>

//                                     </div>
//                                     <h2 className="title-font font-medium text-3xl text-pink-400 fonts1" >{getAllUser.length}</h2>
//                                     <p className=" text-pink-500  font-bold" >Total User</p>
//                                 </div>
//                             </Tab>
//                         </TabList>

//                         <TabPanel>
//                             <ProductDetail />
//                         </TabPanel>

//                         <TabPanel>
//                             <OrderDetail/>
//                         </TabPanel>

//                         <TabPanel>
//                            <UserDetail/>
//                         </TabPanel>
//                     </Tabs>
//                 </div>
//             </div>
//         </div>
//         </Layout>
//     );
// }

// export default AdminDashboard;

import { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import OrderDetail from '../../components/admin/OrderDetail';
import UserDetail from '../../components/admin/UserDetail';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct, getAllOrder, getAllUser } = context;


    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg mb-8">
                    <h1 className="text-center text-3xl font-bold text-pink-600">Admin Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg flex flex-col items-center justify-center">
                        <img className="w-24 h-24 rounded-full mb-4" src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="Admin Avatar" />
                        <div>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Name: </span>{user?.name}</p>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Email: </span>{user?.email}</p>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Date: </span>{user?.date}</p>
                            <p className="text-lg font-semibold mb-1"><span className="font-bold">Role: </span>{user?.role}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3  rounded-lg">
                            <h2 className="text-pink-600 text-3xl font-semibold">{getAllProduct.length}</h2>
                            <p className="text-pink-600 font-bold">Total Products</p>
                        </div>

                        <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3  rounded-lg">
                            <h2 className="text-pink-600 text-3xl font-semibold">{getAllOrder.length}</h2>
                            <p className="text-pink-600 font-bold">Total Orders</p>
                        </div>

                        <div className="border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3  rounded-lg">
                            <h2 className="text-pink-600 text-3xl font-semibold">{getAllUser.length}</h2>
                            <p className="text-pink-600 font-bold">Total Users</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-8 px-6 rounded-lg border border-gray-200">
                    <Tabs>
                        <TabList className="flex flex-wrap -m-4 text-center justify-center">
                            <Tab className="p-4 m-1 md:w-1/3 sm:w-1/2 w-full cursor-pointer bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                Total Products
                            </Tab>
                            <Tab className="p-4 m-1 md:w-1/3 sm:w-1/2 w-full cursor-pointer bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                Total Orders
                            </Tab>
                            <Tab className="p-4 m-1 md:w-1/3 sm:w-1/2 w-full cursor-pointer bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                Total Users
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <ProductDetail />
                        </TabPanel>

                        <TabPanel>
                            <OrderDetail />
                        </TabPanel>

                        <TabPanel>
                            <UserDetail />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
