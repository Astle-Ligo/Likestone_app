const express = require("express");
const {
    addInventory,
    getAllInventory,
    getInventory,
    editInventory,
    patchEditInventory,
    deleteInventory,
} = require("../controllers/inventoryController.js");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Routes
router.get("/", verifyToken, getAllInventory);
router.get("/:id", verifyToken, getInventory);
router.post("/add", verifyToken, authorizeRoles("Admin", "Manager"), addInventory);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editInventory);
router.patch("/:id", verifyToken, authorizeRoles("Admin", "Manager"), patchEditInventory);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteInventory);

module.exports = router;
