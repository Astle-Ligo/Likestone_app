import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Project location is required"],
        },
        clientName: {
            type: String,
        },
        budget: {
            type: Number,
            default: 0,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["Ongoing", "Completed", "On Hold", "Cancelled"],
            default: "Ongoing",
        },
        description: {
            type: String,
        },
        assignedSupervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff", // The supervisor managing this project
        },
        expenses: [
            {
                description: String,
                amount: Number,
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
