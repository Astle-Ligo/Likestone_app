const express = require("express");
const {
    addPurchase,
    getAllPurchases,
    getPurchasesBySupplier,
    editPurchase,
    patchPurchase,
    deletePurchase,
} = require("../controllers/purchaseController.js");

const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", verifyToken, getAllPurchases);
router.get("/supplier/:supplierId", verifyToken, getPurchasesBySupplier);

router.post("/", verifyToken, authorizeRoles("Admin", "Manager"), addPurchase);
router.put("/:id", verifyToken, authorizeRoles("Admin", "Manager"), editPurchase);
router.patch("/:id", verifyToken, authorizeRoles("Admin", "Manager"), patchPurchase);
router.delete("/:id", verifyToken, authorizeRoles("Admin", "Manager"), deletePurchase);

module.exports = router;
