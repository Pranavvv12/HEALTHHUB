import express from "express";
import { addToCart, removeFromCart, getUserCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

// API routes
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/", getUserCart); // Changed from /:userId to handle token auth
router.post("/clear", clearCart);
// Add this to your cartRoutes.js
router.get("/test", (req, res) => {
    res.json({ message: "Cart routes are working!" });
  });

export default router;