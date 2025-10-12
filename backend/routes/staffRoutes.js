const express = require("express");
const { registerStaff, loginStaff, getCurrentStaff } = require("../controllers/staffController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");


const router = express.Router();

router.post("/register", verifyToken, authorizeRoles("Manager", "Admin"), registerStaff);
router.post("/login", loginStaff);

router.get("/me", verifyToken, getCurrentStaff);

module.exports = router;
