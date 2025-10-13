const Employee = require("../models/Employee.js");

const addEmployee = async (req, res) => {
  try {
    const { name, phone, address, skillType, dailyWage } = req.body;

    const newEmployee = await Employee.create({
      name,
      phone,
      address,
      skillType,
      dailyWage,
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
    const { name, phone, address, skillType, dailyWage } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, phone, address, skillType, dailyWage }, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
  deleteEmployee,
};