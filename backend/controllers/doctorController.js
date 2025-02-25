import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Doctor Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, phone, location } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: "Doctor already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create doctor
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      phone,
      location,
    });

    await doctor.save();

    // Generate token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, doctor });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

// Doctor Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: "Doctor not found" });

    // Compare password
    const isValidPassword = await bcrypt.compare(password, doctor.password);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, doctor });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get All Doctors (for admin panel)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// Delete a Doctor (Admin)
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};

// Add a Doctor (Fixed Specialization Field)
const addDoctor = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging step
    const { name, email, password, specialization, experience, phone, location } = req.body;

    if (!name || !email || !password || !specialization || !experience || !phone || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ ...req.body, password: hashedPassword });

    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error });
  }
};



export { signup, login, getAllDoctors, deleteDoctor, addDoctor };
