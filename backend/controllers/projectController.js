const Project = require("../models/Project.js");

const addProject = async (req, res) => {
  try {
    const { name, location, clientName , budget, startDate, endDate, status, description, assignedSupervisor, expenses } = req.body;
    const newProject = await Project.create({ name, location, clientName , budget, startDate, endDate, status, description, assignedSupervisor, expenses });
    if (!newProject) return res.status(400).json({ message: "Project not created" });
    res.status(201).json({ message: "Project added successfully", newProject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: "Projects fetched successfully", projects: projects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project updated successfully", updatedProject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => { 
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully", deletedProject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProject,
  getProjects,
  editProject,
  deleteProject,
};