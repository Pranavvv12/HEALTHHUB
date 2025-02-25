import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Add.css";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "defaultPassword123",
    specialization: "",
    experience: "",
    hospital: "",
    languages: "",
    qualification: "",
    available: "true",
    timing: "",
    image: "",
    phone: "",
    location: "",
  });

  // Fetch doctors list from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/doctors");
        setDoctors(res.data);
      } catch (error) {
        toast.error("Failed to fetch doctors!");
        console.error("Error fetching doctors:", error.message);
      }
    };

    fetchDoctors();
  }, []);

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert "available" field to Boolean
    const newValue = name === "available" ? value === "true" : value;

    setNewDoctor({ ...newDoctor, [name]: newValue });
  };

  // Add new doctor
  const handleAddDoctor = async () => {
    console.log("Sending Data:", newDoctor);

    // Validate required fields
    for (const key in newDoctor) {
      if (newDoctor[key] === "") {
        toast.warn(`${key} is required!`);
        return;
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/doctors/add",
        newDoctor
      );
      setDoctors((prev) => [...prev, res.data]);
      toast.success("Doctor added successfully!");

      // Reset form after successful addition
      setNewDoctor({
        name: "",
        email: "",
        password: "defaultPassword123",
        specialization: "",
        experience: "",
        hospital: "",
        languages: "",
        qualification: "",
        available: "true",
        timing: "",
        image: "",
        phone: "",
        location: "",
      });
    } catch (error) {
      toast.error("Failed to add doctor!");
      console.error("Error adding doctor:", error.response?.data || error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel - Manage Doctors</h1>

      <div className="admin-form">
        {[
          { name: "name", placeholder: "Doctor Name" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "specialization", placeholder: "Specialization" },
          { name: "experience", placeholder: "Experience (years)" },
          { name: "hospital", placeholder: "Hospital Name" },
          { name: "languages", placeholder: "Languages Spoken" },
          { name: "qualification", placeholder: "Qualification" },
          { name: "timing", placeholder: "Timing (e.g., 9 AM - 5 PM)" },
          { name: "phone", placeholder: "Phone Number" },
          { name: "location", placeholder: "Location" },
          { name: "image", placeholder: "Image URL" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={newDoctor[field.name]}
            onChange={handleChange}
          />
        ))}

        {/* Dropdown for "available" field */}
        <label>Available:</label>
        <select name="available" value={newDoctor.available} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button onClick={handleAddDoctor}>Add Doctor</button>
      </div>

      <ul className="doctor-list">
  {doctors.map((doctor, index) => (
    <li key={doctor._id || index} className="doctor-card">
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />
      <div className="doctor-info">
        <strong>{doctor.name}</strong>
        <p>{doctor.specialization}</p>
      </div>
    </li>
  ))}
</ul>


      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDoctors;
