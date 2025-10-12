const Attendance = require("../models/Attendance.js");

const addAttendance = async (req, res) => {
  try {
    const { date, project, employee, status, markedBy } = req.body;
    const newAttendance = await Attendance.create({ date, project, employee, status, markedBy });
    if (!newAttendance) return res.status(400).json({ message: "Attendance not created" });
    res.status(201).json({ message: "Attendance added successfully", newAttendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json({ message: "Attendance fetched successfully", attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editAttendance = async (req, res) => {    
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAttendance) return res.status(404).json({ message: "Attendance not found" });
    res.status(200).json({ message: "Attendance updated successfully", updatedAttendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) return res.status(404).json({ message: "Attendance not found" });
    res.status(200).json({ message: "Attendance deleted successfully", deletedAttendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addAttendance,
  getAttendance,
  editAttendance,
  deleteAttendance,
};  