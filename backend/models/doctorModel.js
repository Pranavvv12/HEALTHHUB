import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  hospital: { type: String },
  languages: { type: [String] },
  qualification: { type: String },
  available: { type: Boolean, default: false },
  timing: { type: String },
  image: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;


