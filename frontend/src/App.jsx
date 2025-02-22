import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home"; 
import Doctors from "./pages/Doctors/Doctors";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import Report from "./pages/Report/Report";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Router>
      <Navbar onSignUpClick={() => setShowPopup(true)} />

      <Routes>
        <Route path="/" element={<Home onSignUpClick={() => setShowPopup(true)} />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/report" element={<Report />} />
      </Routes>

      <Footer />

      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </Router>
  );
};

export default App;
