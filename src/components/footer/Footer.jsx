import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-600">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
            <ul className="text-white">
              <li><Link to="/about" className="hover:text-black">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-black">Careers</Link></li>
              <li><Link to="/press" className="hover:text-black">Press</Link></li>
              <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Support</h3>
            <ul className="text-white">
              <li><Link to="/help-center" className="hover:text-black">Help Center</Link></li>
              <li><Link to="/contact-us" className="hover:text-black">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-black">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-black">Returns</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="text-white">
              <li><Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-black">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-black">Disclaimer</Link></li>
            </ul>
          </div>
          {/* Social */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Social Networks</h3>
            <ul className="text-white flex space-x-4">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Facebook<i className="fab fa-facebook-f"></i></a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Twitter<i className="fab fa-twitter"></i></a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram<i className="fab fa-instagram"></i></a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn<i className="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-white font-semibold">© 2025 E-Commerce</p>
        <p className="text-white mt-4 md:mt-0 font-semibold"><strong>Made by Abhishek </strong></p>
          <p className="text-white mt-4 md:mt-0 font-semibold">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
