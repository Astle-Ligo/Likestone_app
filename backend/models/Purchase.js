const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        category: {
            type: String, // e.g., "Cement", "Steel"
            required: true,
            trim: true,
        },
        itemName: {
            type: String,
            required: true,
            trim: true,
        },
        unit: {
            type: String,
            enum: [
                "Nos",
                "Bag",
                "Kg",
                "Litre",
                "Meter",
                "Foot",
            ],
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
        },
        payment: {
            amountPaid: {
                type: Number,
                default: 0,
            },
            mode: {
                type: String,
                enum: ["Cash", "Bank", "UPI", "Cheque", "Credit"],
                default: "Credit",
            },
            paidOn: {
                type: Date,
            },
            notes: {
                type: String,
                trim: true,
            },
        },
    },
    { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
