import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandGoogle } from "@tabler/icons-react";

const LoginPopup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return; 
    console.log(isLogin ? "Logging in..." : "Signing up...");
  };

  // Handle Google OAuth sign-in
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked!");
    // Add OAuth logic here
  };

  return (
    <AnimatePresence>
      <motion.div
        className="mt-10 fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            aria-label="Close popup"
            className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                aria-label="Email address"
                placeholder="your@email.com"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                aria-label="Password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-4 h-4 cursor-pointer accent-green-600"
                />
                <label className="text-sm text-gray-600">
                  I agree to HealthHub's{" "}
                  <span className="text-green-600 cursor-pointer font-medium">
                    Terms of Service
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              className={`w-full h-10 font-semibold rounded-lg transition duration-200 ${
                email && password && (isLogin || isChecked)
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!email || !password || (!isLogin && !isChecked)}
            >
              {isLogin ? "Log in" : "Create account"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Sign-in */}
            <button
              className={`flex items-center justify-center space-x-2 w-full h-10 font-medium border rounded-lg bg-gray-50 hover:bg-gray-100 ${
                true ? "" : "cursor-not-allowed opacity-50"
              }`}
              type="button"
              onClick={handleGoogleSignIn}
            >
              <IconBrandGoogle className="h-5 w-5 text-gray-700" />
              <span className="text-gray-700">Sign in with Google</span>
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span
                  className="text-green-600 cursor-pointer font-medium"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-green-600 cursor-pointer font-medium"
                  onClick={() => setIsLogin(true)}
                >
                  Log in
                </span>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginPopup;
