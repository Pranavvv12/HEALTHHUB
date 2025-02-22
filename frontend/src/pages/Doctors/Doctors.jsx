import React, { useState, useEffect } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    {
        id: 1,
        name: "Dr. John Doe",
        specialization: "Cardiologist",
        experience: 10,
        location: "New York, NY",
        fee: 50,
        available: true,
        image: "https://via.placeholder.com/100",
        rating: 4.5,
        reviews: [
          {
            user: "Alice Johnson",
            comment: "Great doctor! Very professional and caring.",
            rating: 5,
            verified: true,
          },
          {
            user: "Robert Smith",
            comment: "Helped me a lot with my heart condition.",
            rating: 4,
            verified: false,
          },
        ],
        availabilityCalendar: {
          "2025-02-23": "Available",
          "2025-02-24": "Not Available",
          "2025-02-25": "Available",
        },
      },
      {
        id: 2,
        name: "Dr. Emily Smith",
        specialization: "Dermatologist",
        experience: 8,
        location: "Los Angeles, CA",
        fee: 40,
        available: false,
        image: "https://via.placeholder.com/100",
        rating: 4.8,
        reviews: [
          {
            user: "Sophia Williams",
            comment: "Very knowledgeable and kind.",
            rating: 5,
            verified: true,
          },
          {
            user: "James Brown",
            comment: "Helped clear my skin issues within weeks!",
            rating: 5,
            verified: true,
          },
        ],
        availabilityCalendar: {
          "2025-02-23": "Not Available",
          "2025-02-24": "Available",
          "2025-02-25": "Not Available",
        },
      },
      {
        id: 3,
        name: "Dr. Michael Brown",
        specialization: "Neurologist",
        experience: 15,
        location: "Chicago, IL",
        fee: 60,
        available: true,
        image: "https://via.placeholder.com/100",
        rating: 4.9,
        reviews: [
          {
            user: "Daniel Carter",
            comment: "Helped me with migraines. Highly recommend!",
            rating: 5,
            verified: true,
          },
          {
            user: "Emma Davis",
            comment: "Explains everything in detail.",
            rating: 4.5,
            verified: false,
          },
        ],
        availabilityCalendar: {
          "2025-02-23": "Available",
          "2025-02-24": "Available",
          "2025-02-25": "Not Available",
        },
      },
    
  ]);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    let filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) &&
        (specialization ? doctor.specialization === specialization : true)
    );
    setFilteredDoctors(filtered);
  }, [search, specialization, doctors]);

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-blue-700">
          Find the Best Healthcare Experts 🩺
        </h1>
        <p className="text-gray-600 mt-2">
          Consult experienced doctors, book appointments, and get virtual checkups.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search by doctor name..."
          className="p-3 border rounded-lg w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
        </select>
      </div>

      {/* Doctors List */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
            onClick={() => setSelectedDoctor(doctor)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full border-2 border-blue-500"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600">{doctor.specialization}</p>
                <p className="text-gray-500">Experience: {doctor.experience} years</p>
                <p className="text-gray-500">📍 {doctor.location}</p>
                <p className="text-gray-500">💲 Fee: ${doctor.fee}</p>
                <p
                  className={`font-bold ${
                    doctor.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doctor.available ? "🟢 Available" : "🔴 Offline"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedDoctor(null)}
            >
              ✖
            </button>
            <div className="flex items-center space-x-4">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-20 h-20 rounded-full border-2 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDoctor.name}</h2>
                <p className="text-blue-600">{selectedDoctor.specialization}</p>
                <p>Experience: {selectedDoctor.experience} years</p>
                <p>📍 {selectedDoctor.location}</p>
                <p>💲 Fee: ${selectedDoctor.fee}</p>
                <p>⭐ Rating: {selectedDoctor.rating}</p>
              </div>
            </div>

            {/* Appointment Booking */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Book an Appointment</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 border rounded-lg w-full mt-2"
              />
              <input
                type="date"
                className="p-3 border rounded-lg w-full mt-2"
              />
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700 transition">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
