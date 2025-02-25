import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../context/UserContext";

const LoginPopup = ({ onClose }) => {
  const { login, signup } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) return;

    if (isLogin) {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    onClose(); // Close popup after successful login/signup
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
          <button
            className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded-lg"
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
                  <span className="text-green-600 cursor-pointer font-medium">Terms of Service</span>
                </label>
              </div>
            )}

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
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span className="text-green-600 cursor-pointer font-medium" onClick={() => setIsLogin(false)}>
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-green-600 cursor-pointer font-medium" onClick={() => setIsLogin(true)}>
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
