import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname))

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

<<<<<<< HEAD
    // add to cart function
    const addCart = (item) => {
        // Clean the item to remove non-serializable fields like Timestamp
        const cleanItem = {
            id: item.id,
            title: item.title,
            price: item.price,
            productImageUrl: item.productImageUrl,
            category: item.category,
            description: item.description,
            // Add any other fields you need, but exclude 'time' and other Firebase-specific fields
        };
        dispatch(addToCart(cleanItem));
=======
    const addCart = (item) => {
        dispatch(addToCart(item));
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
        toast.success("Added to cart");
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    }

<<<<<<< HEAD
    // Cart persistence is now handled by the useCartPersistence hook
=======
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7

    return (
        <Layout>
            <div className="mt-10">
                {/* Heading */}
                <div className="">
                    <h1 className="text-center mb-5 text-3xl font-bold text-gray-800 first-letter:uppercase">{categoryname}</h1>
                </div>

                {/* Main */}
                {loading ?
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                    :
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
<<<<<<< HEAD
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
=======
                            <div className="flex flex-wrap -m-4 justify-center">
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
                                {filterProduct.length > 0 ?
                                    filterProduct.map((item, index) => {
                                        const { id, title, price, productImageUrl } = item;
                                        return (
<<<<<<< HEAD
                                            <div key={index} className="flex flex-col h-full">
                                                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer flex flex-col h-full">
                                                    <div className="relative overflow-hidden bg-gray-50 flex-shrink-0">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="w-full h-64 lg:h-80 object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                                                            src={productImageUrl}
                                                            alt={title}
                                                        />
                                                    </div>
                                                    <div className="p-6 bg-white flex-grow flex flex-col">
=======
                                            <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                                <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
                                                    <img
                                                        onClick={() => navigate(`/productinfo/${id}`)}
                                                        className="lg:h-80 h-64 w-full object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-105"
                                                        src={productImageUrl}
                                                        alt={title}
                                                    />
                                                    <div className="p-6 bg-white">
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
                                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                            E-Commerce
                                                        </h2>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-2">
                                                            {title}
                                                        </h1>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                            ₹{price}
                                                        </h1>
<<<<<<< HEAD
                                                        <div className="flex justify-center mt-auto">
=======
                                                        <div className="flex justify-center">
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
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
                                    })
                                    :
                                    <div className="text-center">
                                        <img className="mb-2 mx-auto" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No products found" />
                                        <h1 className="text-black text-xl">No {categoryname} product found</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                }
            </div>
        </Layout>
    );
}

export default CategoryPage;
