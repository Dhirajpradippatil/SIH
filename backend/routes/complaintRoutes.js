const express = require("express");
const { createComplaint, getComplaintsByRole, updateStatus } = require("../controllers/complaintController.js");
const router = express.Router();

router.post("/", createComplaint);
router.get("/", getComplaintsByRole);
router.patch("/:id/status", updateStatus);

module.exports = router;
