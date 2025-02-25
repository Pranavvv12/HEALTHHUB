import axios from "axios";

export const summarizeFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("http://127.0.0.1:5000/summarize", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.summary;
  } catch (error) {
    console.error("Summarization failed:", error);
    return null;
  }
};
