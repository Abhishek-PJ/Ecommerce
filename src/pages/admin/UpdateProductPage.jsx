import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productDoc = await getDoc(doc(fireDB, "products", id));
            const productData = productDoc.data();
            setProduct({
                title: productData?.title,
                price: productData?.price,
                productImageUrl: productData?.productImageUrl,
                category: productData?.category,
                description: productData?.description,
                quantity: productData?.quantity,
                time: productData?.time,
                date: productData?.date
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "") {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product updated successfully");
            getAllProductFunction();
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    const cancelUpdate = () => {
        navigate('/admin-dashboard');
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="min-h-screen flex justify-center items-center bg-pink-100 px-4">
            {loading && <Loader />}
            <div className="bg-white px-8 py-10 border border-gray-200 rounded-xl shadow-md w-full max-w-md m-2">
                <div className="mb-6">
                    <h2 className="text-center text-3xl font-bold text-gray-800">Update Product</h2>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder="Product Title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Product Price"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl}
                        onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                        placeholder="Product Image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <select
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="" disabled>Select Product Category</option>
                        {categoryList.map((value, index) => (
                            <option key={index} value={value.name}>{value.name}</option>
                        ))}
                    </select>

                    <textarea
                        name="description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Product Description"
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <div className="flex space-x-4">
                    <button
                            onClick={cancelUpdate}
                            type="button"
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md text-lg font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={updateProduct}
                            type="button"
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md text-lg font-bold transition-colors"
                        >
                            Update Product
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
