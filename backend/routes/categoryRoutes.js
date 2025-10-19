const express = require("express");
const {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", verifyToken, getAllCategories);
router.get("/:id", verifyToken, getCategory);
router.post("/", verifyToken, authorizeRoles("Admin", "Manager"), addCategory);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), updateCategory);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteCategory);

module.exports = router;
