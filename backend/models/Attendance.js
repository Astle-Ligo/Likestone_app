const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        status: {
            type: String,
            enum: ["Present", "Absent", "Half Day"],
            default: "Absent",
        },
        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff", // Admin or Supervisor who marked attendance
        },
    },
    { timestamps: true }
);

attendanceSchema.index({ date: 1, project: 1, employee: 1 }, { unique: true });
// Prevents duplicate attendance records for the same worker on the same project and date

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
