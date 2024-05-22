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
    }

    // CartItems
    const cartItems = useSelector((state) => state.cart);

    // NavList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
            {!parsedUser ? (
                <>
                    <li>
                        <Link to={'/signup'}>Signup</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                </>
            ) : null}

            {/* User */}
            {parsedUser?.role === "user" && (
                <li>
                    <Link to={'/user-dashboard'}>User</Link>
                </li>
            )}

            {/* Admin */}
            {parsedUser?.role === "admin" && (
                <li>
                    <Link to={'/admin-dashboard'}>Admin</Link>
                </li>
            )}

            {/* Logout */}
            {parsedUser && (
                <li className="cursor-pointer" onClick={logout}>
                    Logout
                </li>
            )}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart({cartItems.length})
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-pink-600 sticky top-0">
            {/* Main */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
                {/* Left */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">E-Commerce</h2>
                    </Link>
                </div>

                {/* Right */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;
