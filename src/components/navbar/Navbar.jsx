import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearCart, loadCartFromFirebase, setCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";
import { saveCartToFirebase } from "../../utils/cartUtils";
import { useCartPersistence } from "../../hooks/useCartPersistence";

const Navbar = () => {
  const context = useContext(myContext);
  const { currentUser, loadUserCart } = context;
  
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

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // Use the new cart persistence hook
  const { handleUserLogin, handleUserLogout } = useCartPersistence();

  // State for search bar visibility
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Logout function
  const logout = async () => {
    try {
      // Handle cart persistence during logout
      handleUserLogout();
      
      navigate("/");
      toast.success("Logout Success");
      localStorage.removeItem('users');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Logout failed");
    }
  };

  // State for toggling the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // NavList Data
  const navList = (
    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 text-white font-medium text-lg px-5 py-2 items-center">
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
      {/* Logged-in User/Admin NavLinks */}
      {parsedUser && (
        <>
          {/* User Dashboard */}
          {parsedUser.role.toLowerCase() === "user" && (
            <li className="hover:text-gray-300 transition duration-300">
              <Link to={'/user-dashboard'} onClick={() => setIsMobileMenuOpen(false)}>User</Link>
            </li>
          )}
          {/* Admin Dashboard */}
          {parsedUser.role.toLowerCase() === "admin" && (
            <li className="hover:text-gray-300 transition duration-300">
              <Link to={'/admin-dashboard'} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            </li>
          )}

          {/* Logout */}
          <li className="cursor-pointer hover:text-gray-300 transition duration-300" onClick={logout}>
            Logout
          </li>
        </>
      )}
      {/* Search Icon */}
      <li className="hover:text-gray-300 transition duration-300 cursor-pointer" onClick={toggleSearch}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </li>
      {/* Cart with Bag Icon */}
      <li className="hover:text-gray-300 transition duration-300 relative">
        <Link to={'/cart'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-2">
            {cartItems.length}
          </span>
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="bg-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              E-Commerce
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-end">
            {navList}
          </nav>
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Search Bar - Desktop */}
        {isSearchVisible && (
          <div className="hidden lg:block pb-4">
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        )}
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navList}
              {/* Show search bar below nav on mobile */}
              <div className="mt-4">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
