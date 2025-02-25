import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { motion } from "framer-motion";

const MarketPlace = () => {
  const { addToCart } = useUser();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/marketplace")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div className="mt-20 bg-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Animated Heading */}
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-900 mb-10"
          initial={{ opacity: 0, y: 50 }} // Start hidden and lower
          animate={{ opacity: 1, y: 0 }} // Fade in and move up
          transition={{ duration: 1, ease: "easeOut" }} // Smooth effect
          whileHover={{ scale: 1.05 }} // Slight zoom on hover
        >
          Explore the Best Medical Equipment for Your Needs
        </motion.h1>

        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-4 text-lg rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-4 focus:ring-green-200 pl-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-30 flex items-center justify-center rounded-2xl overflow-hidden bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 h-36 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mt-4">{item.name}</h2>
              <p className="text-gray-600 mt-2">Includes {item.quantity} servings</p>
              <div className="mt-4 text-2xl font-bold text-green-600">₹{item.price}</div>
              <button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold w-full"
                onClick={() => addToCart(item)}
              >
                Add to Box
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MarketPlace;
