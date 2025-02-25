import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Add item to cart
const addToCart = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const { productId, name, image, price, quantity } = req.body;
      console.log("Adding item to cart:", { productId, name, price, quantity });
  
      // Find the user's cart
      let userCart = await Cart.findOne({ userId });
      
      if (!userCart) {
        // Create new cart if user doesn't have one
        userCart = new Cart({
          userId,
          items: [{ productId, name, image, price, quantity }]
        });
      } else {
        // Check if product already exists in cart
        const itemIndex = userCart.items.findIndex(item => 
          item.productId.toString() === productId.toString()
        );
        
        if (itemIndex > -1) {
          // Product exists in cart, update quantity
          userCart.items[itemIndex].quantity += quantity;
        } else {
          // Product doesn't exist in cart, add new item
          userCart.items.push({ productId, name, image, price, quantity });
        }
      }
      
      await userCart.save();
      console.log("Updated cart:", userCart);
      
      res.status(200).json({ message: "Item added to cart", cart: userCart.items });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
  };

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const { productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
  
      // Find the cart and pull the item
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart", error: error.message });
    }
  };

// Get user's cart
// In cartController.js
// In cartController.js
const getUserCart = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const cart = await Cart.findOne({ userId });
      
      // Log what we're sending back for debugging
      console.log("Cart found:", cart);
      console.log("Sending cart items:", cart ? cart.items : []);
      
      res.status(200).json({ cart: cart ? cart.items : [] });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
  };

// Clear cart after checkout
const clearCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const result = await Cart.deleteMany({ userId });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};

export { addToCart, removeFromCart, getUserCart, clearCart };