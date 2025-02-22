import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BarChart2, RefreshCw } from "lucide-react";

const ExploreMenu = () => {
  return (
    <motion.section
      className="bg-[#f5fce8] mt-20 py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Title Section */}
        <motion.div
          className="flex items-center justify-center space-x-2 text-green-600 font-semibold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Sparkles className="w-5 h-5" />
          <span>THE HEALTHHUB ADVANTAGES</span>
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-gray-900 mt-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Why Choose Us?
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mt-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Revolutionizing healthcare with AI-powered diagnosis, appointment booking, and seamless medical access.
        </motion.p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: <Sparkles />,
              title: "Instant Doctor Access – Anytime, Anywhere",
              description:
                "Book appointments with top doctors in real-time, reducing wait times and improving patient care.",
            },
            {
              icon: <BarChart2 />,
              title: "Understand Your Health – No More Confusion",
              description:
                "Our AI simplifies complex medical reports, making healthcare more transparent for everyone.",
            },
            {
              icon: <RefreshCw />,
              title: "One-Stop Healthcare Marketplace",
              description:
                "From doctor consultations to medical equipment, everything you need—on one platform.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ExploreMenu;
