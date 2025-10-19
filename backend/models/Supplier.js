const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        totalPurchases: {
            type: Number,
            default: 0,
        },
        totalPaid: {
            type: Number,
            default: 0,
        },
        balance: {
            type: Number,
            default: 0, // totalPurchases - totalPaid
        },
        accountDetails: {
            accountHolderName: { type: String, trim: true },
            bankName: { type: String, trim: true },
            accountNumber: { type: String, trim: true },
            ifscCode: { type: String, trim: true },
            upiId: { type: String, trim: true },
        },
    },
    { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
