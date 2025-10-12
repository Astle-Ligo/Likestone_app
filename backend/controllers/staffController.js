const Staff = require("../models/Staff.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await Staff.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await Staff.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "Staff registered successfully", newStaff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Staff.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCurrentStaff = async (req, res) => {
  try {
    const user = await Staff.findById(req.user.id).select("name email role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerStaff, loginStaff, getCurrentStaff };
