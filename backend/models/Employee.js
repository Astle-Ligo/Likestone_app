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
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        totalWorkingDayCount: {
            type: Number,
            default: 0,
        },
        leaveDayCount: {
            type: Number,
            default: 0,
        },
        overtime: {
            type: Number,
            default: 0,
        },
        dueAmount: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
