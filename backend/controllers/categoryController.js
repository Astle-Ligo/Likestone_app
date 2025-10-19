const Category = require("../models/Category.js");

// ➕ Add Category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        res.status(201).json({ message: "Category added successfully", category });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📋 Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 📦 Get Single Category
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✏️ Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category updated successfully", category: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ❌ Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Category not found" });
        res.json({ message: "Category deleted successfully", category: deleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
