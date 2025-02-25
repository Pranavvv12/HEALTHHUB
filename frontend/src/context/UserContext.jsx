import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing userData:", error);
        localStorage.removeItem("user"); // Reset invalid data
      }
    }
  
    setCart(storedCart);
  }, []);
  

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setIsAuthenticated(true);
        toast.success("Login Successful!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed!");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", { name, email, password });

      if (res.data?.user && res.data?.token) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        toast.success("Signup Successful!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed!");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setCart([]);
    toast.success("Logged out successfully!");
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    toast.success("Item added to cart");
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    toast.success("Item removed from cart");
  };

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.");
      return;
    }
    setOrderHistory([...orderHistory, ...cart]);
    setCart([]);
    toast.success("Order placed successfully!");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signup,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout,
        orderHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
