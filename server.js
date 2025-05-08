require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const contactsRouter = require('./routes/contacts');

const app = express();

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/contacts', contactsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));