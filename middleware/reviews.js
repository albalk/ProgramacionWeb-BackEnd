const jwt = require('jsonwebtoken');
const { handleHttpError } = require("../utils/handleError")

const checkReview = (req, res, next) => {
    try{
        const cifBody = req.body.cif  //Extrae el cif del body
        const cifUrl = req.params.cif //Extrae el cif de la url

        if(cifBody !== cifUrl){ // si ninguno de los cif coincide con el del token
            handleHttpError(res, "CIF_DONT_MATCH", 403)
            return
        }

        next()
    }catch(err){
        handleHttpError(res, "ERROR_REVIEW_CIF", 403)
    }
}

module.exports = checkReview