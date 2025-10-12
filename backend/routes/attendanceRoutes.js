const express = require("express");
const { addAttendance, getAttendance, editAttendance, deleteAttendance } = require("../controllers/attendanceController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add", verifyToken, authorizeRoles("Admin", "Manager"), addAttendance);
router.get("/", verifyToken, authorizeRoles("Admin", "Manager"), getAttendance);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editAttendance);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteAttendance);

module.exports = router;