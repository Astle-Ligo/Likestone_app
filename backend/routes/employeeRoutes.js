const express = require("express");
const {
  addEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employeeController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// All routes protected, only Admin (and Manager) can manage employees
router.post("/add", verifyToken, authorizeRoles("Admin", "Manager"), addEmployee);
router.get("/", verifyToken, authorizeRoles("Admin", "Manager"), getAllEmployees);
router.get("/:id", verifyToken, authorizeRoles("Admin", "Manager"), getEmployee);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editEmployee);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteEmployee);

module.exports = router;

// changes made :- getEmployees -> getAllEmployees , added a new route getEmployee
