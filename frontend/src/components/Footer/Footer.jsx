import React from "react";
import logo from "../../assets/navlogo.png"; 

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-6">
      <div className="mt-15 max-w-6xl mx-auto px-8">
   
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Clover Logo" className="w-10 h-8" />
            <span className="text-lg font-semibold text-gray-900">HealthHub</span>
          </div>

          
          <nav className="flex space-x-6 mt-8">
            {["Home","Doctors","Marketplace","Report Summarization"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-gray-500 hover:text-gray-700 transition duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        
        <div className="border-t border-gray-300 my-4 mt-8"></div>

      
        <p className="text-black-500 text-sm">&copy; 2025 HealthHub</p>
      </div>
    </footer>
  );
};

export default Footer;
