const swaggerJsdoc = require("swagger-jsdoc");
const { updateComerce, updateWebpage } = require("../controllers/comerce");

const options = {
        definition: {
        openapi: "3.0.3",
        info: {
            title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
            version: "0.1.0",
            description:
            "This is a CRUD API application made with Express and documented with Swagger"
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
                    required: ["name", "cif", "direccion", "email", "password", "telefono", "webpage"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Many manitas"
                        },
                        cif: {
                            type: "string",
                            example: "1234",
                            unique: true
                        },
                        direccion: {
                            type: "string",
                            example: "Madrid"
                        },
                        email: {
                            type: "string",
                            example: "tienda@gmail.com",
                            unique: true
                        },
                        password: {
                            type: "string",
                            example: "contraseña"
                        },
                        telefono: {
                            type: "string",
                            example: "123456789"
                        },
                        webpage: {
                            type: "object",
                            example: null
                        },
                    },
                },
                updateComerce: {
                    type: "object",
                    required: ["name", "direccion", "email", "password", "telefono"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Many manitas"
                        },
                        direccion: {
                            type: "string",
                            example: "Madrid"
                        },
                        email: {
                            type: "string",
                            example: "tienda@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "contraseña"
                        },
                        telefono: {
                            type: "string",
                            example: "123456789"
                        }
                    }

                },
                users: {
                    type: "object",
                    required: ["name", "email", "password", "age", "ciudad", "intereses", "recibirOfertas"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Menganito"
                        },
                        email: {
                            type: "string",
                            example: "menganito@gmail.com"
                        },
                        password:{
                            type: "string",
                            example: "contraseña"
                        },
                        age: {
                            type: "number",
                            example: 20
                        },
                        ciudad: {  
                            type: "string",
                            example: "Madrid"
                        },
                        intereses: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["deportes", "tecnología"]
                        },
                        recibirOfertas: {
                            type: "boolean",
                            example: true
                        }
                    },
                },
                updateUser: {
                    type: "object",
                    required: ["name", "age", "ciudad", "intereses", "recibirOfertas"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Menganito"
                        },
                        age: {
                            type: "number",
                            example: 20
                        },
                        ciudad: {  
                            type: "string",
                            example: "Madrid"
                        },
                        intereses: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["deportes", "tecnología"]
                        },
                        recibirOfertas: {
                            type: "boolean",
                            example: true
                        },
                    },
                },
                webpage: {
                    type: "object",
                    required: ["cif", "webpage"],
                    properties: {
                        cif: {
                            type: "string",
                            example: "CIFCOMERCIO"
                        },
                        webpage: {
                            type: "object",
                            required: ["ciudad", "actividad", "titulo", "resumen", "textos", "fotos"],
                            properties: {
                                ciudad: {
                                    type: "string",
                                    example: "Madrid"
                                },
                                actividad: {
                                    type: "string",
                                    example: "Reparaciones"
                                },
                                titulo: {
                                    type: "string",
                                    example: "Reparaciones de todo tipo"
                                },
                                resumen: {
                                    type: "string",
                                    example: "Reparamos todo tipo de cosas"
                                },
                                textos: {
                                    type: "string",
                                    example: "Reparamos todo tipo de cosas"
                                },
                                fotos: {
                                    type: "string",
                                    example: "foto1"
                                }
                            }
                        }
                    }
                },
                updateWebpage: {
                    type: "object",
                    required: ["webpage"],
                    properties: {
                        webpage: {
                            type: "object",
                            required: ["ciudad", "actividad", "titulo", "resumen", "textos", "fotos"],
                            properties: {
                                ciudad: {
                                    type: "string",
                                    example: "Madrid"
                                },
                                actividad: {
                                    type: "string",
                                    example: "Reparaciones"
                                },
                                titulo: {
                                    type: "string",
                                    example: "Reparaciones de todo tipo"
                                },
                                resumen: {
                                    type: "string",
                                    example: "Reparamos todo tipo de cosas"
                                },
                                textos: {
                                    type: "string",
                                    example: "Reparamos todo tipo de cosas"
                                },
                                fotos: {
                                    type: "string",
                                    example: "foto1"
                                }
                            }
                        }
                    }
                },
                reseña: {
                    type: "object",
                    required: ["cif", "scoring", "reseñas"],
                    properties: {
                        cif: {
                            type: "string",
                            example: "CIFCOMERCIO"
                        },
                        webpage: {
                            type: "object",
                            required: ["scoring", "reseñas"],
                            properties: {
                                scoring: {
                                    type: "number",
                                    example: 5
                                },
                                reseñas: {
                                    type: "string",
                                    example: "Muy buen servicio"
                                }
                            }
                        }
                    }    
                },
                login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "menganito@gmail.com"
                        },
                        password: {
                            type: "string",
                            example: "contraseña"
                        }
                    }
                }
            },
        },
    },
    apis: ["./routes/*.js"],
};
  
module.exports = swaggerJsdoc(options)