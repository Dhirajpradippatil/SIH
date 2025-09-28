const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Electricity", "Cleaning", "Documents", "Water", "Road"],
  },
  description: String,
});

module.exports = mongoose.model("Department", departmentSchema);
