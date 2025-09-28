const express = require("express");
const router = express.Router();
const {
  getAllDepartments,
  createDepartment,
} = require("../controllers/departmentController");

router.get("/", getAllDepartments);
router.post("/", createDepartment); // You can protect this with admin middleware

module.exports = router;
