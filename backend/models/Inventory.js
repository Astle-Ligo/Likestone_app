const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
        },
        unit: {
            type: String,
            enum: [
                "Bag",
                "Kg",
                "Ton",
                "Litre",
                "Piece",
                "Box",
                "Bundle",
                "Foot",
                "Meter",
                "Dozen",
                "Set",
                "Sheet",
                "Packet",
                "Roll",
                "Carton"
            ],
            required: true,
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
        totalValue: {
            type: Number,
            default: 0,
        },
        purchaseDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        billFile: {
            type: String, // future file path or link
        },
    },
    { timestamps: true }
);

// 🧮 Auto-calculate total value
inventorySchema.pre("save", function (next) {
    this.totalValue = this.quantity * this.rate;
    next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
