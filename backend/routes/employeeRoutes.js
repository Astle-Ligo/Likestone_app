const express = require("express");  
const {
  addEmployee,
  getEmployees,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employeeController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// All routes protected, only Admin (and Manager) can manage employees
router.post("/add", verifyToken, authorizeRoles("Admin", "Manager"), addEmployee);
router.get("/", verifyToken, authorizeRoles("Admin", "Manager"), getEmployees);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editEmployee);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteEmployee);

module.exports = router;
