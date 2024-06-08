import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/cartSlice";

const Navbar = () => {
  // Get user from localStorage
  const user = localStorage.getItem('users');
  let parsedUser = null;

  if (user) {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  // Navigate
  const navigate = useNavigate();
  
  // Use dispatch hook
  const dispatch = useDispatch();

  // Logout function
  const logout = () => {
    navigate("/");
    toast.success("Logout Success");
    localStorage.removeItem('users');
    dispatch(clearCart());
    localStorage.removeItem('cart');
  };

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // State for toggling the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // NavList Data
  const navList = (
    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-white font-medium text-lg px-5 py-2">
      {/* Home */}
      <li className="hover:text-gray-300 transition duration-300">
        <Link to={'/'} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
      </li>

      {/* All Product */}
      <li className="hover:text-gray-300 transition duration-300">
        <Link to={'/allproduct'} onClick={() => setIsMobileMenuOpen(false)}>All Product</Link>
      </li>

      {/* Categories */}
      <li className="relative">
        <button 
          className="hover:text-gray-300 transition duration-300 focus:outline-none" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Categories
        </button>
        {isDropdownOpen && (
          <ul className="absolute bg-white text-black rounded-lg shadow-lg mt-2 py-2 w-48 z-50">
            {['Mens', 'Womens', 'Beauty', 'Mobiles', 'TV', 'Grocery', 'Kitchen', 'Books'].map(category => (
              <li className="hover:bg-gray-200 transition duration-200" key={category}>
                <Link to={`/category/${category}`} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>{category}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>

      {/* Signup and Login */}
      {!parsedUser && (
        <>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to={'/signup'} onClick={() => setIsMobileMenuOpen(false)}>Signup</Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to={'/login'} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          </li>
        </>
      )}

      {/* User Dashboard */}
      {parsedUser?.role === "User" && (
        <li className="hover:text-gray-300 transition duration-300">
          <Link to={'/user-dashboard'} onClick={() => setIsMobileMenuOpen(false)}>User</Link>
        </li>
      )}

      {/* Admin Dashboard */}
      {parsedUser?.role === "Admin" && (
        <li className="hover:text-gray-300 transition duration-300">
          <Link to={'/admin-dashboard'} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
        </li>
      )}

      {/* Logout */}
      {parsedUser && (
        <li className="cursor-pointer hover:text-gray-300 transition duration-300" onClick={logout}>
          Logout
        </li>
      )}

      {/* Cart */}
      <li className="hover:text-gray-300 transition duration-300">
        <Link to={'/cart'} onClick={() => setIsMobileMenuOpen(false)}>
          Cart({cartItems.length})
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-pink-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex flex-col lg:flex-row lg:items-center justify-between">
        {/* Logo and Menu Button */}
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Link to={'/'}>
            <span className="font-bold text-white text-2xl lg:text-3xl tracking-wide ml-1 lg:ml-0">E-Commerce</span>
          </Link>
          <div className="lg:hidden py-1 px-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar (hidden on small screens) */}
        <div className="hidden my-2 lg:block lg:max-w-xs lg:w-full">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        {navList}
        {/* Search Bar (visible on small screens) */}
        <div className="lg:hidden mt-4 lg:mt-0 px-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
