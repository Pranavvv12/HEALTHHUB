import MarketPlace from "../models/marketPlace.js"; 
import dotenv from "dotenv";

dotenv.config();

const addProduct = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, price, description, image, available, features, reviews } = req.body;

    if (!name || !price || !description || !image || available === undefined) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Use MarketPlace model correctly
    const product = new MarketPlace({
      name,
      price,
      description,
      image,
      available,
      features,
      reviews,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await MarketPlace.find(); // Corrected here
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await MarketPlace.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await MarketPlace.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export { addProduct, getAllProducts, deleteProduct, updateProduct };
