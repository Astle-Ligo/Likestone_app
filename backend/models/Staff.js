import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const staffSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["Admin", "Supervisor", "Manager"],
            default: "Admin",
        },
        isActive: {
            type: Boolean,
            default: true,
        },  
    },
    { timestamps: true } // auto adds createdAt, updatedAt
);


const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
