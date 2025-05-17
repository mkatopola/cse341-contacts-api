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
              properties: {
                firstName: { example: "any" },
                lastName: { example: "any" },
                email: { example: "any" },
                favoriteColor: { example: "any" },
                birthday: { example: "any" }
              }
            }
          }
        ],
        responses: {
          "201": { description: "Created" },
          "400": { description: "Bad Request" }
        }
      }
    },
    "/{id}": {
      put: {
        tags: ["Contacts"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string"
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                firstName: { example: "any" },
                lastName: { example: "any" },
                email: { example: "any" },
                favoriteColor: { example: "any" },
                birthday: { example: "any" }
              }
            }
          }
        ],
        responses: {
          "200": { description: "OK" },
          "400": { description: "Bad Request" },
          "404": { description: "Not Found" }
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);