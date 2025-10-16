const Employee = require("../models/Employee.js");

const addEmployee = async (req, res) => {
  try {

    // Detailes Added by Astle

    const {
      name,
      phone,
      address,
      skillType,
      dailyWage,
      totalWagesPaid,
      isActive,
      aadhar,
      gender,
      photo,
      totalWorkingDayCount,
      leaveDayCount,
      overtime,
      dueAmount
    } = req.body;

    const newEmployee = await Employee.create({
      name,
      phone,
      address,
      skillType,
      dailyWage,
      totalWagesPaid: totalWagesPaid || 0,
      isActive: isActive !== undefined ? isActive : true,
      aadhar,
      gender,
      photo: photo,
      totalWorkingDayCount: totalWorkingDayCount || 0,
      leaveDayCount: leaveDayCount || 0,
      overtime: overtime || 0,
      dueAmount: dueAmount || 0
    });

    res.status(201).json({
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Changed name from getEmployees to getAllEmployees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Added By Astle 
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone,
      address,
      skillType,
      dailyWage,
      totalWagesPaid,
      isActive,
      aadhar,
      gender,
      photo,
      totalWorkingDayCount,
      leaveDayCount,
      overtime,
      dueAmount
    } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      name,
      phone,
      address,
      skillType,
      dailyWage,
      totalWagesPaid: totalWagesPaid || 0,
      isActive: isActive !== undefined ? isActive : true,
      aadhar,
      gender,
      photo: photo,
      totalWorkingDayCount: totalWorkingDayCount || 0,
      leaveDayCount: leaveDayCount || 0,
      overtime: overtime || 0,
      dueAmount: dueAmount || 0
    }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const patchEditEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
}

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully", employee: deletedEmployee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
  patchEditEmployee,
  deleteEmployee,
};