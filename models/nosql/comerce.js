const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete") //importa el borrado logico

//define el esquema del comercio
const comerceScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        cif: {
            type: String,
            unique: true //valor unico para cada comercio
        },
        direccion: {
            type: String
        },
        email: {
            type: String,
            unique: true //valor unico para cada comercio
        },
        password: {
            type: String
        },
        telefono: {
            type: String
        },
        webpage: {
            type: {
                ciudad: {
                    type: String,
                },
                actividad: {
                    type: String
                },
                titulo: {
                    type: String
                },
                resumen: {
                    type: String
                },
                textos: {
                    type: [String]
                },
                fotos: {
                    type: [String]
                },
                scoring_total: {
                    type: Number,
                    default: 0
                },
                scoring: {
                    type: [Number]
                },
                numPuntuaciones: {
                    type: Number,
                    default: 0
                },
                reseñas: {
                    type: [String]
                }
            },
            default: null
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)

//sobrescribe las funciones de borrado para poder usar el borrado logico
comerceScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comerce", comerceScheme)