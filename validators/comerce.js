const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//valida la obtención de un elemento
const validatorGetComerce = [
    check("cif").exists().notEmpty(), //comprueba que el email existe y que no está vacio
    (req, res, next) => {
        //devuelve la respuesta ya validada
        return validateResults(req, res, next)
    }
]

//valida la obtención de un elemento
const validatorUpdateComerce = [
    check("name").optional().isString(), 
    check("direccion").optional().isString(), 
    check("email").optional().isEmail(), 
    check("password").optional().isString(),
    check("telefono").optional().isString(),
    (req, res, next) => validateResults(req, res, next)
]

//valida la creacion de una pagina web
const validatorCreateWebpage = [
    check("cif").exists().notEmpty(),
    check("webpage.ciudad").exists().notEmpty().isString(),
    check("webpage.actividad").exists().notEmpty().isString(),
    check("webpage.titulo").exists().notEmpty().isString(),
    check("webpage.resumen").exists().notEmpty().isString(),
    check("webpage.textos").exists().isString(),
    check("webpage.fotos").exists().isString(),
    (req, res, next) => validateResults(req, res, next)
]

//valida la actualizacion de los datos de una pagina web
const validatorUpdateWebpage = [
    check("cif").exists().notEmpty(),
    check("webpage.ciudad").optional().isString(),
    check("webpage.actividad").optional().isString(),
    check("webpage.titulo").optional().isString(),
    check("webpage.resumen").optional().isString(),
    check("webpage.textos").optional().isString(),
    check("webpage.fotos").optional().isString(),
    (req, res, next) => validateResults(req, res, next)
]

//valida la publicacion de reseñas
const validatorUpdateWebpageReviews = [
    check("cif").exists().notEmpty(),
    check("webpage.scoring").optional().isNumeric(),
    check("webpage.reseñas").optional().isString(),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorGetComerce, validatorUpdateComerce, validatorCreateWebpage, validatorUpdateWebpage, validatorUpdateWebpageReviews }