require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/db')

const StaffRoutes = require("./routes/staffRoutes.js");
const EmployeeRoutes = require("./routes/employeeRoutes.js");
const ProjectRoutes = require("./routes/projectRoutes.js");
const AttendanceRoutes = require("./routes/attendanceRoutes.js");
const InventoryRoutes = require("./routes/inventoryRoutes.js")

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => res.send('API running'));

app.use(cors({
    origin: "http://localhost:5173", // your frontend's URL
    credentials: true,
}));

app.use("/api/staff", StaffRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/inventory", InventoryRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
