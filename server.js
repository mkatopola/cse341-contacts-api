// Description: This file contains the server configuration and route handling for the Contacts API.
// It sets up the Express server, connects to the MongoDB database, and defines the routes for handling contacts.
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const connectDB = require("./config/db");
const contactsRouter = require("./routes/contacts");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "https://cse341-contacts-api-frsq.onrender.com",
      "http://localhost:3000"
    ]
  })
);
// Add root route to verify server status
app.get("/", (req, res) => {
  res.send("Contacts API - CSE341 Project");
});
// Swagger documentation route
app.use(
  "/api-docs",
  swaggerUi.serve,
  (req, res, next) => {
    swaggerFile.host = req.get("host");
    req.swaggerDoc = swaggerFile;
    next();
  },
  swaggerUi.setup()
);
// Middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/contacts", contactsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
