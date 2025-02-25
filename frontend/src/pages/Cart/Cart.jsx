import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, checkout } = useUser();

  useEffect(() => {
    console.log("Current cart data:", cart);
  }, [cart]);

  return (
    <div className="bg-[#f3f4f6] min-h-screen p-8">
      <h1 className="text-4xl font-semibold text-center text-[#1e293b]">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center mt-6">
          <p className="text-center text-gray-600 mt-4">Your cart is empty.</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto mt-6">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-bold text-[#1e293b]">{item.name}</h2>
                <p className="text-blue-700 font-semibold">₹{item.price}</p>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md" onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span className="mx-3 text-lg">{item.quantity}</span>
                <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md" onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
              <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <button className="w-full mt-6 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold" onClick={checkout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
