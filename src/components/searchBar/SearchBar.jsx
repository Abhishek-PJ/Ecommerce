import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context
    const navigate = useNavigate();

    // Search State 
    const [search, setSearch] = useState("");

    // Filtered Search Data
    const filteredProducts = getAllProduct.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleProductClick = (productId) => {
        navigate(`/productinfo/${productId}`);
        setSearch(""); // Clear search after selection
    };

    return (
        <div className="relative max-w-md mx-auto">
            {/* Search input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder='Search for products...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='bg-white border border-pink-200 rounded-lg pl-10 pr-4 py-3 w-full outline-none text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm'
                />
                {/* Search icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Search drop-down */}
            {search && (
                <div className="absolute top-full left-0 right-0 bg-white border border-pink-200 shadow-lg rounded-lg mt-1 z-50 max-h-80 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, 6).map((product, index) => (
                            <div 
                                key={index} 
                                className="px-4 py-3 cursor-pointer hover:bg-pink-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200" 
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <img 
                                            className="w-12 h-12 object-cover rounded-md" 
                                            src={product.productImageUrl} 
                                            alt={product.title}
                                            onError={(e) => {
                                                e.target.src = "https://cdn-icons-png.flaticon.com/128/10437/10437090.png";
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {product.title}
                                        </p>
                                        <p className="text-sm text-pink-600 font-semibold">
                                            ₹{product.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                            <img 
                                className="w-16 h-16 mb-3 opacity-50" 
                                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" 
                                alt="No results" 
                            />
                            <p className="text-gray-500 text-sm font-medium">No products found</p>
                            <p className="text-gray-400 text-xs mt-1">Try different keywords</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
