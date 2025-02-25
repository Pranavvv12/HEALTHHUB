import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Doctors from "./pages/Doctors/Doctors";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import Report from "./pages/Report/Report";
import Cart from "./pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <UserProvider>
      <Router>
        <Navbar onSignUpClick={() => setShowPopup(true)} />

        <main className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home onSignUpClick={() => setShowPopup(true)} />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/report" element={<Report />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <Footer />

        {/* Login Popup */}
        {showPopup && <LoginPopup isLogin={true} onClose={() => setShowPopup(false)} />}

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </UserProvider>
  );
};

export default App;
