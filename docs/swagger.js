const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "alba.lopez@u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            comerce: {
                type: "object",
                required: ["name", "age", "email", "password"],
                properties: {
                    nombreComercio: {
                        type: "string",
                        example: "Many manitas"
                    },
                    cif: {
                        type: "string",
                        example: "1234"
                    },
                    direccion: {
                        type: "string",
                        example: "Madrid"
                    },
                    email: {
                        type: "string",
                        example: "tienda@gmail.com"
                    },
                    telefono: {
                        type: "string",
                        example: "123456789"
                    },
                    pageId: {
                        type: "integer",
                        example: 3
                    },
                },
            },
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)