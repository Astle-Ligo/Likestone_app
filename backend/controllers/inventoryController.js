const Inventory = require("../models/Inventory.js");

const addInventory = async (req, res) => {
    try {
        const {
            category,
            itemName,
            supplier,
            quantity,
            rate,
            purchaseDate,
            billFile
        } = req.body;

        const newItem = await Inventory.create({
            category,
            itemName,
            supplier,
            quantity: quantity || 0,
            rate: rate || 0,
            purchaseDate: purchaseDate || Date.now(),
            billFile: billFile || null,
        });

        res.status(201).json({
            message: "Inventory item added successfully",
            item: newItem,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllInventory = async (req, res) => {
    try {
        const items = await Inventory.find()
            .populate("category", "name")
            .populate("supplier", "name phone")
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Inventory.findById(id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const editInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category,
            itemName,
            supplier,
            quantity,
            rate,
            purchaseDate,
            billFile
        } = req.body;

        const updatedItem = await Inventory.findByIdAndUpdate(
            id,
            {
                category,
                itemName,
                supplier,
                quantity: quantity || 0,
                rate: rate || 0,
                purchaseDate: purchaseDate || Date.now(),
                billFile: billFile || null,
            },
            { new: true }
        );

        if (!updatedItem)
            return res.status(404).json({ message: "Item not found" });

        res.json({
            message: "Inventory item updated successfully",
            item: updatedItem,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const patchEditInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedItem = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedItem)
            return res.status(404).json({ message: "Item not found" });

        res.json({
            message: "Inventory item updated successfully",
            item: updatedItem,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Inventory.findByIdAndDelete(id);
        if (!deletedItem)
            return res.status(404).json({ message: "Item not found" });

        res.json({
            message: "Inventory item deleted successfully",
            item: deletedItem,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addInventory,
    getAllInventory,
    getInventory,
    editInventory,
    patchEditInventory,
    deleteInventory,
};
