

import React from "react";
import { motion } from "framer-motion";

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.005 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const Header = () => {
  const title = "Revolutionizing Healthcare, One Click at a Time.".split("");

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className=" text-center py-16 mt-20" 
    >
      {/* Trusted Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="inline-block mt-8 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold shadow-md "
      >
        📈 Smarter Healthcare, Better Outcomes
      </motion.div>
      

      {/* Main Heading */}
      <h1 className="text-5xl font-bold text-gray-900 mt-7">
        {title.map((char, index) => (
          <motion.span key={index} custom={index} variants={letterAnimation}>
            {char}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto"
      >
        Maximize efficiency with our AI-powered healthcare marketplace—  
        Book appointments, get AI-assisted diagnoses, and access medical supplies effortlessly.
      </motion.p>

      {/* Features */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mt-6 space-y-2 text-gray-800 text-lg"
      >
        <motion.p variants={letterAnimation}>🔹 <b>AI-Powered Diagnosis & Report Summarization</b></motion.p>
        <motion.p variants={letterAnimation}>🔹 <b>Seamless Medical Equipment Shopping</b></motion.p>
        <motion.p variants={letterAnimation}>🔹 <b>Instant Doctor Appointments</b></motion.p>
      </motion.div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="px-6 py-3 border border-gray-700 rounded-lg text-gray-700 hover:bg-gray-200 transition"
        >
          ℹ️ More Info
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="px-6 py-3 bg-black text-white rounded-lg hover:shadow-lg transition"
        >
          🚀 Get Started
        </motion.button>
      </div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-gray-500 text-sm mt-6 italic"
      >
        Your health, your way—powered by AI.
      </motion.p>
    </motion.header>
  );
};

export default Header;
