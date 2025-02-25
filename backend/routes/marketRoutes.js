import express from 'express';
import { addProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/marketController.js";

const router = express.Router();

router.post("/add", addProduct);          // Add a new product
router.get("/", getAllProducts);          // Get all products
router.delete("/:id", deleteProduct);     // Delete a product
router.put("/:id", updateProduct);

export default router;
