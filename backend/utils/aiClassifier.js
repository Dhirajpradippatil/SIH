// File: backend/utils/aiClassifier.js
const axios = require("axios");

exports.isFakeComplaint = async (title, description) => {
  try {
    const response = await axios.post("http://localhost:8000/predict", {
      title,
      description
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data.fake;
  } catch (error) {
    console.error("AI prediction failed:", error.message);
    return false; // fallback: assume not fake if model call fails
  }
};




