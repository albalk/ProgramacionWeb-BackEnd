const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//valida la obtención de un elemento
const validatorGetUser = [
    check("email").exists().notEmpty(), //comprueba que el email existe y que no está vacio
    (req, res, next) => {
        //devuelve la respuesta ya validada
        return validateResults(req, res, next)
    }
]

//valida la obtención de un elemento
const validatorUpdateUser = [
    check("name").optional().isString(), 
    check("age").optional().isNumeric(), 
    check("ciudad").optional().isString(), 
    check("intereses").optional().isArray(), 
    check("recibirOfertas").optional().isBoolean(), 
    (req, res, next) => {
        //devuelve la respuesta ya validada
        return validateResults(req, res, next)
    }
]

module.exports = { validatorGetUser, validatorUpdateUser }