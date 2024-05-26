import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Navbar = () => {
  // Get user from localStorage
  let user = localStorage.getItem('users');
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

  // Logout function
  const logout = () => {
    localStorage.removeItem('users');
    navigate("/");
    toast.success("Logout Success");
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
          <ul className="absolute bg-white text-black rounded-lg shadow-lg mt-2 py-2 w-48">
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Mens'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Mens</Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Womens'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Womens</Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Beauty '} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Beauty </Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Mobiles'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Mobiles</Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/TV'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>TV</Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Grocery'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Grocery</Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Kitchen'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Kitchen</Link>
            </li>
            <li className="hover:bg-gray-200 transition duration-300">
              <Link to={'/category/Books'} className="block px-4 py-2" onClick={() => setIsDropdownOpen(false)}>Books</Link>
            </li>
          </ul>
        )}
      </li>

      {/* Signup */}
      {!parsedUser ? (
        <>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to={'/signup'} onClick={() => setIsMobileMenuOpen(false)}>Signup</Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to={'/login'} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          </li>
        </>
      ) : null}

      {/* User */}
      {parsedUser?.role === "user" && (
        <li className="hover:text-gray-300 transition duration-300">
          <Link to={'/user-dashboard'} onClick={() => setIsMobileMenuOpen(false)}>User</Link>
        </li>
      )}

      {/* Admin */}
      {parsedUser?.role === "admin" && (
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
      <div className="container mx-auto px-4 py-2 flex justify-between items-center lg:justify-between">
        {/* Logo and Search */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to={'/'}>
            <h2 className="font-bold text-white text-3xl tracking-wide">E-Commerce</h2>
          </Link>
          {/* Mobile Menu Button */}
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
        <div className="hidden my-2  lg:block">
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
