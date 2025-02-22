import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/navlogo.png";
import usericon from "../../assets/user.png";

const Navbar = ({ onSignUpClick }) => {
  return (
    <nav className="bg-[#f5fce8] fixed top-5 left-1/2 transform -translate-x-1/2 max-w-5xl w-[90%] flex items-center justify-between p-4 rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md shadow-md z-10">
      
      <div className="flex items-center space-x-1 cursor-pointer">
        <Link to="/">
          <img src={logo} alt="HealthHub Logo" className="h-8 w-10" />
        </Link>
        <span className="font-semibold text-lg">HealthHub</span>
      </div>

      <div className="hidden md:flex space-x-6 text-gray-700">
        <Link to="/" className="px-3 py-1 rounded-2xl transition duration-300 hover:bg-gray-200 hover:shadow-md">
          Home
        </Link>
        <Link to="/doctors" className="px-3 py-1 rounded-2xl transition duration-300 hover:bg-gray-200 hover:shadow-md">
          Doctors
        </Link>
        <Link to="/marketplace" className="px-3 py-1 rounded-2xl transition duration-300 hover:bg-gray-200 hover:shadow-md">
          Marketplace
        </Link>
        <Link to="/report" className="px-3 py-1 rounded-2xl transition duration-300 hover:bg-gray-200 hover:shadow-md">
          Report Summarization
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 shadow-md bg-white hover:bg-gray-100 transition duration-300">
          <img src={usericon} alt="User" className="w-6 h-6" />
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition duration-300"
          onClick={onSignUpClick}
        >
          <span>Sign Up</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
