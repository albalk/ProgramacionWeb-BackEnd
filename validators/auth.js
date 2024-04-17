const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("name").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:4, max: 16} ),
    check("age").exists().notEmpty().isNumeric(),
    check("ciudad").exists().notEmpty(),
    check("intereses").exists().notEmpty().isArray(),
    check("recibirOfertas").exists().notEmpty().isBoolean(),
    //no hace falta el validador del role porque por defecto es "user"
    (req, res, next) => validateResults(req, res, next)
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:4, max: 16} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


const validatorRegisterComerce = [
    check("name").exists().notEmpty(), 
    check("cif").exists().notEmpty(), 
    check("direccion").exists().notEmpty(), 
    check("email").exists().notEmpty().isEmail(), 
    check("password").exists().notEmpty().isLength( {min:4, max: 16} ),
    check("telefono").exists().notEmpty(),
    check("webpage").optional().isObject(),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorRegister, validatorLogin, validatorRegisterComerce }