const express = require("express");
const { addProject, getProject, getAllProjects, editProject, deleteProject } = require("../controllers/projectController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add", verifyToken, authorizeRoles("Admin", "Manager"), addProject);
router.get("/", verifyToken, authorizeRoles("Admin", "Manager"), getAllProjects);
router.get("/:id", verifyToken, authorizeRoles("Admin", "Manager"), getProject);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editProject);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteProject);

module.exports = router;

// Changes Made by Astle :- getProject added , getProjects --> getAllProjects