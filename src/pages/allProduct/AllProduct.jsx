/* #######This is design no 1 for allproduct page######## */ 
// import { useNavigate } from "react-router";
// import Layout from "../../components/layout/Layout";
// import { useContext, useEffect } from "react";
// import myContext from "../../context/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { addToCart, deleteFromCart } from "../../redux/cartSlice";
// import Loader from "../../components/loader/Loader";

// const AllProduct = () => {
//     const navigate = useNavigate();

//     const context = useContext(myContext);
//     const { loading, getAllProduct } = context;

//     const cartItems = useSelector((state) => state.cart);
//     const dispatch = useDispatch();

//     const addCart = (item) => {
//         dispatch(addToCart(item));
//         toast.success("Added to cart");
//     }

//     const deleteCart = (item) => {
//         dispatch(deleteFromCart(item));
//         toast.success("Deleted from cart");
//     }

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }, [cartItems]);

//     return (
//         <Layout>
//             <div className="py-8">
//                 {/* Heading */}
//                 <div className="text-center mb-5">
//                     <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
//                 </div>

//                 {/* Main Content */}
//                 <section className="text-gray-600 body-font">
//                     <div className="container mx-auto px-5 sm:px-4">
//                         <div className="flex justify-center">
//                             {loading && <Loader />}
//                         </div>
//                         <div className="flex flex-wrap -m-4">
//                             {getAllProduct.map((item, index) => {
//                                 const { id, title, price, productImageUrl } = item;
//                                 return (
//                                     <div key={index} className="p-4 w-full sm:w-1/2 lg:w-1/4">
//                                         <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
//                                             <img
//                                                 onClick={() => navigate(`/productinfo/${id}`)}
//                                                 className="lg:h-80 h-52 w-full object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-105"
//                                                 src={productImageUrl}
//                                                 alt={title}
//                                             />
//                                             <div className="p-6 bg-white">
//                                                 <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                                                     E-Commerce
//                                                 </h2>
//                                                 <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                                                     {title.length > 25 ? `${title.substring(0, 25)}...` : title}
//                                                 </h1>
//                                                 <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                                                     ₹{price}
//                                                 </h1>
//                                                 <div className="flex justify-center">
//                                                     {cartItems.some((p) => p.id === item.id) ? (
//                                                         <button
//                                                             onClick={() => deleteCart(item)}
//                                                             className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold transition-colors duration-300 ease-in-out w-full">
//                                                             Delete From Cart
//                                                         </button>
//                                                     ) : (
//                                                         <button
//                                                             onClick={() => addCart(item)}
//                                                             className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out w-full">
//                                                             Add To Cart
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </Layout>
//     );
// }

/* #######This is design no 2 for allproduct page######## */ 

// import { useNavigate } from "react-router";
// import Layout from "../../components/layout/Layout";
// import { useContext, useEffect, useRef } from "react";
// import myContext from "../../context/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { addToCart, deleteFromCart } from "../../redux/cartSlice";
// import Loader from "../../components/loader/Loader";

// const AllProduct = () => {
//     const navigate = useNavigate();

//     const context = useContext(myContext);
//     const { loading, getAllProduct } = context;

//     const cartItems = useSelector((state) => state.cart);
//     const dispatch = useDispatch();

//     const addCart = (item) => {
//         dispatch(addToCart(item));
//         toast.success("Added to cart");
//     };

//     const deleteCart = (item) => {
//         dispatch(deleteFromCart(item));
//         toast.success("Deleted from cart");
//     };

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }, [cartItems]);

//     const groupByCategory = (products) => {
//         return products.reduce((acc, product) => {
//             const category = product.category || 'Others';
//             if (!acc[category]) {
//                 acc[category] = [];
//             }
//             acc[category].push(product);
//             return acc;
//         }, {});
//     };

//     const categorizedProducts = groupByCategory(getAllProduct);

//     const scrollRefs = useRef({});
//     const setScrollRef = (category) => (el) => {
//         if (el) {
//             scrollRefs.current[category] = el;
//         }
//     };

//     const scrollLeft = (category) => {
//         const ref = scrollRefs.current[category];
//         if (ref) {
//             ref.scrollBy({ left: -300, behavior: 'smooth' });
//         }
//     };

//     const scrollRight = (category) => {
//         const ref = scrollRefs.current[category];
//         if (ref) {
//             ref.scrollBy({ left: 300, behavior: 'smooth' });
//         }
//     };

//     return (
//         <Layout>
//             <div className="py-8">
//                 {/* Heading */}
//                 <div className="text-center mb-5">
//                     <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
//                 </div>

//                 {/* Main Content */}
//                 <section className="text-gray-600 body-font">
//                     <div className="container mx-auto px-5 sm:px-4">
//                         <div className="flex justify-center">
//                             {loading && <Loader />}
//                         </div>
//                         {Object.keys(categorizedProducts).map((category, idx) => (
//                             <div key={idx} className="mb-8">
//                                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
//                                 <div className="relative flex items-center">
//                                     <button
//                                         className="absolute left-0 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-2 px-2 sm:px-4 rounded-full z-10 transform transition-transform hover:scale-110 focus:outline-none"
//                                         onClick={() => scrollLeft(category)}
//                                     >
//                                         &lt;
//                                     </button>
//                                     <div
//                                         className="flex space-x-4 pb-4 overflow-x-auto w-full scroll-smooth"
//                                         ref={setScrollRef(category)}
//                                     >
//                                         {categorizedProducts[category].map((item, index) => {
//                                             const { id, title, price, productImageUrl } = item;
//                                             return (
//                                                 <div key={index} className="min-w-[200px] sm:min-w-[240px] md:min-w-[320px]">
//                                                     <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
//                                                         <img
//                                                             onClick={() => navigate(`/productinfo/${id}`)}
//                                                             className="lg:h-80 h-52 w-full object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-105"
//                                                             src={productImageUrl}
//                                                             alt={title}
//                                                         />
//                                                         <div className="p-6 bg-white">
//                                                             <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                                                                 E-Commerce
//                                                             </h2>
//                                                             <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                                                                 {title.length > 25 ? `${title.substring(0, 25)}...` : title}
//                                                             </h1>
//                                                             <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                                                                 ₹{price}
//                                                             </h1>
//                                                             <div className="flex justify-center">
//                                                                 {cartItems.some((p) => p.id === item.id) ? (
//                                                                     <button
//                                                                         onClick={() => deleteCart(item)}
//                                                                         className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold transition-colors duration-300 ease-in-out w-full">
//                                                                         Delete From Cart
//                                                                     </button>
//                                                                 ) : (
//                                                                     <button
//                                                                         onClick={() => addCart(item)}
//                                                                         className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out w-full">
//                                                                         Add To Cart
//                                                                     </button>
//                                                                 )}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                     <button
//                                         className="absolute right-0 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-2 px-2 sm:px-4 rounded-full z-10 transform transition-transform hover:scale-110 focus:outline-none"
//                                         onClick={() => scrollRight(category)}
//                                     >
//                                         &gt;
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </Layout>
//     );
// };

// export default AllProduct;

/* #######This is design no 3 for allproduct page######## */ 

import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useRef } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const groupByCategory = (products) => {
        return products.reduce((acc, product) => {
            const category = product.category || 'Others';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    };

    const categorizedProducts = groupByCategory(getAllProduct);

    const scrollRefs = useRef({});
    const setScrollRef = (category) => (el) => {
        if (el) {
            scrollRefs.current[category] = el;
        }
    };

    const scrollLeft = (category) => {
        const ref = scrollRefs.current[category];
        if (ref) {
            const itemWidth = ref.children[0].offsetWidth;
            ref.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = (category) => {
        const ref = scrollRefs.current[category];
        if (ref) {
            const itemWidth = ref.children[0].offsetWidth;
            ref.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
                </div>

                {/* Main Content */}
                <section className="text-gray-600 body-font">
                    <div className="container mx-auto px-5 sm:px-4">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        {Object.keys(categorizedProducts).map((category, idx) => (
                            <div key={idx} className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
                                <div className="relative flex items-center">
                                    <button
                                        className="absolute left-0 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-2 px-2 sm:px-4 rounded-full z-10 transform transition-transform hover:scale-110 focus:outline-none"
                                        onClick={() => scrollLeft(category)}
                                    >
                                        &lt;
                                    </button>
                                    <div
                                        className="flex space-x-4 pb-4 overflow-x-auto w-full scroll-smooth"
                                        ref={setScrollRef(category)}
                                    >
                                        {categorizedProducts[category].map((item, index) => {
                                            const { id, title, price, productImageUrl } = item;
                                            return (
                                                <div key={index} className="min-w-[200px] sm:min-w-[240px] md:min-w-[320px]">
                                                    <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="lg:h-80 h-52 w-full object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-105"
                                                            src={productImageUrl}
                                                            alt={title}
                                                        />
                                                        <div className="p-6 bg-white">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                                E-Commerce
                                                            </h2>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.length > 25 ? `${title.substring(0, 25)}...` : title}
                                                            </h1>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{price}
                                                            </h1>
                                                            <div className="flex justify-center">
                                                                {cartItems.some((p) => p.id === item.id) ? (
                                                                    <button
                                                                        onClick={() => deleteCart(item)}
                                                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold transition-colors duration-300 ease-in-out w-full">
                                                                        Delete From Cart
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => addCart(item)}
                                                                        className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-bold transition-all duration-300 ease-in-out w-full">
                                                                        Add To Cart
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        className="absolute right-0 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold py-2 px-2 sm:px-4 rounded-full z-10 transform transition-transform hover:scale-110 focus:outline-none"
                                        onClick={() => scrollRight(category)}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
