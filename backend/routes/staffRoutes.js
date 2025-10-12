const express = require("express");
const { registerStaff, loginStaff } = require("../controllers/staffController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", verifyToken, authorizeRoles("Manager","Admin"), registerStaff); // Only Manager can register others
router.post("/login", loginStaff);

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await Staff.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
