const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "API for managing contacts"
  },
  host: "localhost:3000/contacts",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    // Add if using authentication
  },
  definitions: {
    Contact: {
      $firstName: "John",
      $lastName: "Doe",
      $email: "john.doe@example.com",
      $favoriteColor: "Blue",
      $birthday: "1990-01-01"
    },
    ContactResponse: {
      _id: "507f1f77bcf86cd799439011",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      favoriteColor: "Blue",
      birthday: "1990-01-01"
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
