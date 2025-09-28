const Department = require("../models/Department");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: "Failed to get departments" });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newDept = await Department.create({ name, description });
    res.status(201).json(newDept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
