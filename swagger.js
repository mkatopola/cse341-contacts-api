// This file is responsible for generating the Swagger documentation for the Contacts API.
// It uses the swagger-autogen library to create a JSON file that describes the API endpoints, request and response formats, and other metadata.
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
    version: "1.0.0",
  },
  host: "cse341-contacts-api-frsq.onrender.com",
  schemes: ["https"],
  basePath: "/contacts",
  consumes: ["application/json"],
  produces: ["application/json"],
  definitions: {
    ContactInput: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      favoriteColor: "Blue",
      birthday: "1990-01-01",
    },
    ContactResponse: {
      id: "60d0fe4f5311236168a109ca",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      favoriteColor: "Blue",
      birthday: "1990-01-01",
    },
    Message: {
      message: "Validation error message",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);