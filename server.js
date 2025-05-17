// Description: This file contains the server configuration and route handling for the Contacts API.
// It sets up the Express server, connects to the MongoDB database, and defines the routes for handling contacts.
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const connectDB = require("./config/db");
const contactsRouter = require("./routes/contacts");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false })
);
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Contacts API - CSE341 Project"));
app.use(
  "/api-docs",
  swaggerUi.serve,
  (req, res, next) => {
    req.swaggerDoc = swaggerFile;
    next();
  },
  swaggerUi.setup()
);

app.use("/contacts", contactsRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
