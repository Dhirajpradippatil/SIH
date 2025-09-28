const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const complaintRoutes = require("./routes/complaintRoutes.js");
const departmentRoutes =require("./routes/departmentRoutes.js");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/departments", departmentRoutes);
// MongoDB 
mongoose. connect()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000 || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
