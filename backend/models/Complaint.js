const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  department: String, // e.g., electricity, sanitation
  location: String,
  imageUrl: String,
  status: { type: String, enum: ["Pending", "In-Progress", "Resolved"], default: "Pending" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isFake: { type: Boolean, default: false },
});

module.exports = mongoose.model("Complaint", complaintSchema);
 