const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "API for managing contacts with full CRUD operations"
  },
  host: "cse341-contacts-api-frsq.onrender.com",
  basePath: "/contacts",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Contacts", description: "Contact management endpoints" }
  ],
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
      birthday: "1990-01-01",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z"
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);