const express = require("express");
const {
    addSupplier,
    getAllSuppliers,
    getSupplier,
    editSupplier,
    patchEditSupplier,
    deleteSupplier,
} = require("../controllers/supplierController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getAllSuppliers);
router.get("/:id", verifyToken, getSupplier);
router.post("/", verifyToken, authorizeRoles("Admin", "Manager"), addSupplier);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editSupplier);
router.patch("/:id", verifyToken, authorizeRoles("Admin", "Manager"), patchEditSupplier);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deleteSupplier);

module.exports = router;
