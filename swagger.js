const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    version: "1.0.0",
    description: "Contact management API for CSE341"
  },
  host: "cse341-contacts-api-frsq.onrender.com",
  basePath: "/contacts",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Contacts",
      description: "Contact Management Endpoints"
    }
  ],
  definitions: {
    Contact: {
      type: "object",
      required: ["firstName", "lastName", "email", "favoriteColor", "birthday"],
      properties: {
        firstName: {
          type: "string",
          example: "John"
        },
        lastName: {
          type: "string",
          example: "Doe"
        },
        email: {
          type: "string",
          format: "email",
          example: "john.doe@example.com"
        },
        favoriteColor: {
          type: "string",
          example: "Blue"
        },
        birthday: {
          type: "string",
          format: "date",
          example: "1990-01-01"
        }
      }
    },
    ContactResponse: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          example: "507f1f77bcf86cd799439011"
        },
        firstName: {
          type: "string",
          example: "John"
        },
        lastName: {
          type: "string",
          example: "Doe"
        },
        email: {
          type: "string",
          example: "john.doe@example.com"
        },
        favoriteColor: {
          type: "string",
          example: "Blue"
        },
        birthday: {
          type: "string",
          example: "1990-01-01"
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2024-01-01T00:00:00.000Z"
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2024-01-01T00:00:00.000Z"
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
