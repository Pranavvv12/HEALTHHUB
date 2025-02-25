import React, { useState } from "react";
import { summarizeFile } from "../../services/summarizationService.js";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";

const ReportSummarization = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSummarize = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    setLoading(true);
    const result = await summarizeFile(file);
    setSummary(result || "Failed to summarize the document.");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div 
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Report Summarization</h1>

        {/* File Upload */}
        <label className="flex flex-col items-center justify-center mt-6 border-2 border-dashed border-blue-500 rounded-xl p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <Upload className="w-10 h-10 text-blue-500" />
          <span className="mt-2 text-gray-600">{file ? file.name : "Upload a PDF, DOCX, or TXT file"}</span>
          <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileChange} />
        </label>

        {/* Summarize Button */}
        <motion.button
          className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
          onClick={handleSummarize}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? <Loader2 className="w-6 h-6 mx-auto animate-spin" /> : "Summarize"}
        </motion.button>

        {/* Summary Output */}
        {summary && (
          <motion.div
            className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-700">Summary:</h2>
            <p className="text-gray-600 mt-2">{summary}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ReportSummarization;
