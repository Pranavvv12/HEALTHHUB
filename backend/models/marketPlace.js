import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema(
    {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
    features: [{ type: String }],
    reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
    },
  ],
    }
)

const MarketPlace=mongoose.model("Product",ProductSchema);
export default MarketPlace;