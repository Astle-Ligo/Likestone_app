const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Employee name is required"],
            trim: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        skillType: {
            type: String,
            enum: ["Mason", "Electrician", "Plumber", "Carpenter", "Helper", "Painter", "Supervisor", "Accounts"],
            default: "Mason",
        },
        dailyWage: {
            type: Number,
            required: true,
            default: 0,
        },
        totalWagesPaid: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },

        // Addded By Astle

        aadhar: {
            type: String,
        },
        photo: {
            type: String,
        },
        leaveDayCount: {
            type: Number,
        },
        overtime: {
            type: Number,
        }
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
