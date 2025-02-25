import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import 'dotenv/config';
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import marketRoutes from "./routes/marketRoutes.js"; 
import cartRoutes from "./routes/cartRoutes.js";
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); 
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/marketplace", marketRoutes); 
app.use("/api/cart", cartRoutes);
// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.send("API IS WORKING");
});

// Start Server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
 