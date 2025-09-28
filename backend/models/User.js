const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["citizen", "admin", "superadmin"], default: "citizen" },
});

module.exports = mongoose.model("User", userSchema);
