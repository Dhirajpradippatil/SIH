// File: backend/controllers/complaintController.js

const Complaint = require("../models/Complaint.js");
const jwt = require("jsonwebtoken");
const { isFakeComplaint } = require("../utils/aiClassifier.js");

// Create Complaint with AI Fake Detection
exports.createComplaint = async (req, res) => {
  try {
    const isFake = await isFakeComplaint(req.body.title, req.body.description);
    console.log("🧠 AI Prediction:", isFake ? "Fake" : "Genuine");

    const complaint = await Complaint.create({
      ...req.body,
      isFake,
      createdAt: new Date()
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Complaints by User Role or Department
exports.getComplaintsByRole = async (req, res) => {
  try {
    const role = req.query.role || "citizen";
    const department = req.query.department;

    const filter = {};
    if (department) filter.department = department;

    const complaints = await Complaint.find(filter).populate("createdBy", "name email");
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Complaint Status (Pending/Resolved)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Complaint Summary Stats for SuperAdmin
exports.getComplaintSummary = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const fake = await Complaint.countDocuments({ isFake: true });

    res.status(200).json({ total, pending, resolved, fake });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
