const Supplier = require("../models/Supplier");

const addSupplier = async (req, res) => {
    try {
        const {
            name,
            phone,
            category,
            accountDetails
        } = req.body;

        const newSupplier = await Supplier.create({
            name,
            phone,
            category,
            accountDetails,
        });

        res.status(201).json({
            message: "Supplier added successfully",
            supplier: newSupplier,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);
        if (!supplier)
            return res.status(404).json({ message: "Supplier not found" });

        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const editSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            phone,
            category,
            accountDetails,
            totalPurchases,
            totalPaid,
            balance,
        } = req.body;

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            {
                name,
                phone,
                category,
                accountDetails,
                totalPurchases,
                totalPaid,
                balance,
            },
            { new: true }
        );

        if (!updatedSupplier)
            return res.status(404).json({ message: "Supplier not found" });

        res.json({
            message: "Supplier updated successfully",
            supplier: updatedSupplier,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const patchEditSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedSupplier)
            return res.status(404).json({ message: "Supplier not found" });

        res.json({
            message: "Supplier updated successfully",
            supplier: updatedSupplier,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        if (!deletedSupplier)
            return res.status(404).json({ message: "Supplier not found" });

        res.json({
            message: "Supplier deleted successfully",
            supplier: deletedSupplier,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addSupplier,
    getAllSuppliers,
    getSupplier,
    editSupplier,
    patchEditSupplier,
    deleteSupplier,
};
