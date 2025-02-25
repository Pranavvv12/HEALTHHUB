import React, { useState } from "react";
import axios from "axios";

const AdminMarketplace = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    available: true,
    features: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:4000/api/marketplace/add", {
        ...product,
        features: product.features.split(",").map((f) => f.trim()),
      });
      alert("Product Added Successfully");
      setProduct({ name: "", price: "", description: "", image: "", available: true, features: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Marketplace</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        className="block w-full p-2 my-2 border"
        value={product.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="block w-full p-2 my-2 border"
        value={product.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="block w-full p-2 my-2 border"
        value={product.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        className="block w-full p-2 my-2 border"
        value={product.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="features"
        placeholder="Features (comma separated)"
        className="block w-full p-2 my-2 border"
        value={product.features}
        onChange={handleChange}
      />
      <button className="px-4 py-2 bg-blue-600 text-white mt-4" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AdminMarketplace;
