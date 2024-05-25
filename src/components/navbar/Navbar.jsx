import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

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
    navigate("/login");
  };

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // NavList Data
  const navList = (
    <ul className="flex space-x-6 text-white font-medium text-lg px-5 ">
      {/* Home */}
      <li className="hover:text-gray-300 transition duration-300">
        <Link to={'/'}>Home</Link>
      </li>

      {/* All Product */}
      <li className="hover:text-gray-300 transition duration-300">
        <Link to={'/allproduct'}>All Product</Link>
      </li>

      {/* Signup */}
      {!parsedUser ? (
        <>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to={'/signup'}>Signup</Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to={'/login'}>Login</Link>
          </li>
        </>
      ) : null}

      {/* User */}
      {parsedUser?.role === "user" && (
        <li className="hover:text-gray-300 transition duration-300">
          <Link to={'/user-dashboard'}>User</Link>
        </li>
      )}

      {/* Admin */}
      {parsedUser?.role === "admin" && (
        <li className="hover:text-gray-300 transition duration-300">
          <Link to={'/admin-dashboard'}>Admin</Link>
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
        <Link to={'/cart'}>
          Cart({cartItems.length})
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-gradient-to-r f bg-pink-600 shadow-lg sticky top-0 z-50">
      {/* Main */}
      <div className="lg:flex lg:justify-between items-center py-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Link to={'/'}>
            <h2 className="font-bold text-white text-3xl tracking-wide">E-Commerce</h2>
          </Link>
          {/* Search Bar (hidden on small screens) */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center mt-4 lg:mt-0">
          {navList}
        </div>

        {/* Search Bar (visible on small screens) */}
        <div className="lg:hidden mt-4 lg:mt-0">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
