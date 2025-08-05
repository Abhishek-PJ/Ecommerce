import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
=======
import { useParams, Navigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
<<<<<<< HEAD
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { useNavigate } from "react-router-dom";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading, currentUser } = context; // Destructure currentUser

  const [product, setProduct] = useState(null);
  const [buyNowOpen, setBuyNowOpen] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
  });

  const { id } = useParams();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get user from localStorage
  const user = localStorage.getItem('users');
  let userrole = null;
  if (user) {
    try {
      userrole = JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const quantityInCart = cartItem?.quantity ?? 0;

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      if (productTemp.exists()) {
        setProduct({ ...productTemp.data(), id: productTemp.id });
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductData();
  }, [id]); // Add 'id' to dependency array for getProductData

  // Cart persistence is now handled by the useCartPersistence hook

  // Add to cart function
  const addCart = () => {
    // Clean the item to remove non-serializable fields like Timestamp
    const cleanItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      productImageUrl: product.productImageUrl,
      category: product.category,
      description: product.description,
      // Add any other fields you need, but exclude 'time' and other Firebase-specific fields
    };
    dispatch(addToCart({ ...cleanItem, quantity: 1 }));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  const buyNowFunction = async () => {
    if (!currentUser) {
      toast.error("Please log in to place an order.");
      return;
    }

    if (!product) {
      toast.error("Product not found.");
      return;
    }

    const { name, address, pincode, mobileNumber } = addressInfo;
    if (!name || !address || !pincode || !mobileNumber) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    const order = {
      userid: currentUser.uid,
      email: currentUser.email,
      cartItems: [product], // For buy now, only the current product
      addressInfo: addressInfo,
      status: "confirmed", // or 'pending' depending on your flow
      time: Timestamp.now(),
      date: new Date().toLocaleString(
        "en-IN",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      ),
    };

    try {
      await addDoc(collection(fireDB, "order"), order);
      toast.success("Order placed successfully!");
      setBuyNowOpen(false); // Close the modal on successful order
      setAddressInfo({ // Clear address info after successful order
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
     
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-white">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : !product ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <img src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="Not found" className="w-24 h-24 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Product Not Found</h2>
            <button onClick={() => navigate('/')} className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Go Home</button>
          </div>
        ) : (
          <div className="max-w-7xl px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
              {/* Product Image Section */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gray-50 p-8 flex items-center justify-center min-h-[500px]">
                    <img
                      className="object-contain w-full h-full max-h-[450px]"
                      src={product?.productImageUrl || 'https://cdn-icons-png.flaticon.com/128/2748/2748614.png'}
                      alt={product?.title || 'No image'}
                    />
                  </div>
                </div>
              </div>

              {/* Product Information Section */}
              <div className="flex flex-col justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {product?.title}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 mr-3">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    </div>
                    <span className="text-gray-600">(36 Reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">₹{product?.price}</span>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product?.description}
                    </p>
                  </div>

                  {/* Cart Controls */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => deleteCart(product)}
                        disabled={quantityInCart === 0}
                        className={`w-12 h-12 text-white border rounded-lg flex items-center justify-center text-xl font-bold transition-colors ${
                          quantityInCart === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 border-red-500"
                        }`}
                      >
                        −
                      </button>
                      <span className="text-2xl font-bold text-gray-900 min-w-[60px] text-center">
                        {quantityInCart}
                      </span>
                      <button
                        onClick={() => addCart()}
                        className="w-12 h-12 text-white bg-green-600 hover:bg-green-700 border border-green-600 rounded-lg flex items-center justify-center text-xl font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    {userrole?.role?.toLowerCase() === "admin" ? (
                      <div className="w-full py-4 text-center text-white bg-gray-400 rounded-xl cursor-not-allowed font-bold text-lg">
                        Admins cannot place orders
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            toast.error("Please log in to continue.");
                            navigate("/login");
                            return;
                          }
                          setBuyNowOpen(true);
                        }}
                        className="w-full py-4 text-center text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 rounded-xl transition-all duration-300 ease-in-out shadow-lg font-bold text-lg"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center text-green-600 mb-2">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-medium">Free delivery by Fri, June 12</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Cash on Delivery available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buy Now Modal */}
            {buyNowOpen && (
              <BuyNowModal
                open={buyNowOpen}
                setOpen={setBuyNowOpen}
                addressInfo={addressInfo}
                setAddressInfo={setAddressInfo}
                buyNowFunction={buyNowFunction}
                userrole={userrole?.role?.toLowerCase()}
                cartItems={[product]}
                totalAmount={product?.price || 0}
              />
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
=======

// ProductInfo component
const ProductInfo = () => {
    // State and context variables
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    // Function to fetch product data
    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            if (productTemp.exists()) {
                setProduct({ ...productTemp.data(), id: productTemp.id });
            } else {
                console.log("Product not found");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Redux state and dispatch
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Function to add item to cart
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    // Function to delete item from cart
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    // User
    const user = JSON.parse(localStorage.getItem('users'));

    // Effect hook to update local storage with cart items
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Effect hook to fetch product data on component mount
    useEffect(() => {
        getProductData();
    }, []);

    // Render JSX
    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-white">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-10 -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-8">
                                <div className="">
                                    <img
                                        className="w-full rounded-lg"
                                        src={product?.productImageUrl}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-4">
                                <div className="lg:pl-10">
                                    <h2 className="text-3xl font-semibold mb-4 text-black dark:text-bl-300">
                                        {product?.title}
                                    </h2>
                                    <div className="flex items-center mb-4">
                                        <p className="mr-2 text-yellow-500">
                                            ★ ★ ★ ★ ★
                                        </p>
                                        <span className="text-black">
                                            (36 Reviews)
                                        </span>
                                    </div>
                                    <p className="text-xl font-semibold mb-4 text-black dark:text-gray-800">
                                        ₹ {product?.price}
                                    </p>
                                    <p className="mb-6 text-black dark:text-gray-800">
                                        {product?.description}
                                    </p>
                                    <div className="flex mb-4">
                                        <button
                                            onClick={() => addCart(product)}
                                            className="w-full mr-2 px-4 py-3 text-center text-white bg-pink-600 border border-pink-600 hover:bg-pink-700 rounded-xl"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => deleteCart(product)}
                                            className="w-full px-4 py-3 text-center text-white bg-pink-600 border border-red-500 hover:bg-gray-600 rounded-xl"
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
                                    {/* <div className="px-2 pb-4 font-medium text-green-700">
                                        <div className="flex gap-4 mb-6">
                                            {user ? (
                                                <p>User is logged in</p>
                                            ) : (
                                                <Navigate to="/login" />
                                            )}
                                        </div>
                                    </div> */}
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600">
                                            Free delivery by Fri, June 12
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Cash on Delivery available
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
>>>>>>> c3925beac52a72e00fc77ae11f3fc342880956d7
