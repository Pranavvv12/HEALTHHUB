import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/doctors").then((res) => setDoctors(res.data));
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    (doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? doctor.speciality === filter : true)
  );

  return (
    <div className="bg-gray-100 mt-20 min-h-screen p-8">
      <div className="bg-blue-600 text-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold">Find the Best Doctors in Chennai</h1>
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search for doctors or specialities"
            className="w-full md:w-2/3 p-3 rounded-lg border border-gray-300 text-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border border-gray-300 w-full md:w-1/3 bg-white text-gray-900"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Specialities</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Orthopaedics">Orthopaedics</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Dermatologist">Dermatologist</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {filteredDoctors.map((doctor) => (
          <motion.div
            key={doctor._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 transition-transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 rounded-full border border-gray-300"
            />
            <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-blue-600 font-medium">{doctor.speciality} | {doctor.experience}</p>
            <p className="text-gray-600">{doctor.hospital}</p>
            <p className="text-gray-500">{doctor.languages.join(", ")}</p>
            <p className="text-gray-500">{doctor.qualification}</p>
            <button
              className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => setSelectedDoctor(doctor)}
            >
              Book Appointment
            </button>
          </motion.div>
        ))}
      </div>

      {selectedDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-6 rounded-lg w-96 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
            <p className="text-gray-600 mt-2">{selectedDoctor.name} - {selectedDoctor.speciality}</p>
            <input
              type="date"
              className="w-full mt-4 p-2 border border-gray-300 rounded-lg text-gray-900"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <input
              type="time"
              className="w-full mt-4 p-2 border border-gray-300 rounded-lg text-gray-900"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg text-gray-900 hover:bg-gray-400 transition-all"
                onClick={() => setSelectedDoctor(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
                onClick={() => {
                  alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
                  setSelectedDoctor(null);
                }}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Doctors;
