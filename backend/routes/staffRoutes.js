const express = require("express");
const { registerStaff, loginStaff } = require("../controllers/staffController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", verifyToken, authorizeRoles("Manager"), registerStaff); // Only Manager can register others
router.post("/login", loginStaff);

router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
