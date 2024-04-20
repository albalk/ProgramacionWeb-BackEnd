const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password:{
            type: String
        },
        age: {
            type: Number
        },
        ciudad: {
            type: String
        },
        intereses: {
            type: [String]
        },
        recibirOfertas: {
            type: Boolean
        },
        role: {
            type: ["user", "admin"], // es el enum de SQL
            default: "user"
        },
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model("users", UserScheme) // “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)