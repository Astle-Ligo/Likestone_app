const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db')

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

// Example route
app.get("/api/message", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
