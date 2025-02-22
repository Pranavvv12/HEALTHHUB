import React from "react";
import { motion } from "framer-motion";
import stethoscopeIcon from "../../assets/steth.png"; // Update the path if needed

const Showcase = () => {
  const features = [
    {
      id: "01",
      title: "Sign Up & Create Your Profile",
      points: [
        "Simple and hassle-free registration process.",
        "Guided steps to ensure seamless onboarding.",
        "No prior technical knowledge required to get started.",
      ],
    },
    {
      id: "02",
      title: "AI-Powered Diagnosis & Report Summarization",
      points: [
        "Upload medical reports (PDF, images) for AI-generated insights.",
        "Receive recommendations on consulting a doctor.",
        "Get simplified summaries of complex medical terms.",
      ],
    },
    {
      id: "03",
      title: "Instant Doctor Appointment Booking",
      points: [
        "Patients can browse, select doctors, and book appointments seamlessly",
        "Doctors manage availability and handle appointment requests.",
        "Receive instant confirmations and timely reminders.",
      ],
    },
    {
      id: "04",
      title: "Healthcare Marketplace for Easy Access",
      points: [
        "Patients & hospitals can search, compare, and buy medical supplies.",
        "Secure payments & home delivery for convenience.",
        "Sellers list products, manage inventory, and fulfill orders efficiently.",
      ],
    },
  ];

  return (
    <motion.section
      className="bg-green-50 py-16 px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section - Aligned Left with Proper Spacing */}
      <div className=" max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          {/* ✅ Properly Sized & Aligned Stethoscope Icon */}
          <motion.img
            src={stethoscopeIcon}
            alt="Stethoscope Icon"
            className="w-10 h-10"
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <h2 className="bg-[#f5fce8] text-5xl font-bold">Our Approach</h2>
        </div>

        <p className="text-gray-600 mt-3 text-lg max-w-2xl">
          Our streamlined process ensures quick, efficient results, from setup to completion.
        </p>
      </div>

      {/* Features Grid */}
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, ease: "easeOut" },
          },
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="bg-white p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-3">
              <motion.span
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-lg font-semibold"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.id}
              </motion.span>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
            </div>
            <ul className="mt-4 text-gray-700 space-y-2">
              {feature.points.map((point, index) => (
                <motion.li
                  key={index}
                  className="text-md leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  • {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Showcase;
