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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
