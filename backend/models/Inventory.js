const mongoose = require("mongoose");


const inventorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        supplier: {
            type: String,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        rate: {
            type: Number,
            required: true,
            default: 0,
        },
        purchaseDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        billFile: {
            type: String, // You can store file URL or filename if you add upload later
        },
    },
    { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
