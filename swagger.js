const swaggerAutogen = require("swagger-autogen")();

const doc = {
  swagger: "2.0",
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "API for managing contacts"
  },
  host: "cse341-contacts-api-frsq.onrender.com",
  basePath: "/contacts",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/": {
      post: {
        tags: ["Contacts"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
              properties: {
                firstName: { type: "string", example: "John" },
                lastName: { type: "string", example: "Doe" },
                email: { type: "string", example: "john@example.com" },
                favoriteColor: { type: "string", example: "Blue" },
                birthday: { type: "string", example: "1990-01-01" }
              }
            }
          }
        ],
        responses: {
          "201": { 
            description: "Created",
            schema: {
              type: "object",
              properties: {
                id: { type: "string", example: "507f1f77bcf86cd799439011" }
              }
            }
          },
          "400": { description: "Bad Request" }
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);