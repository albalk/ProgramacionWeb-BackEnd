const jwt = require('jsonwebtoken');
const { handleHttpError } = require("../utils/handleError")

const checkCif = (req, res, next) => {
    try{
        const cifBody = req.body.cif  //Extrae el cif del body
        const cifUrl = req.params.cif //Extrae el cif de la url

        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1] // Extrae el token de la cabecera
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Decodifica el token
        const comerceCif = decodedToken.cif // Extrae el cif del token

        if(cifBody !== comerceCif && cifUrl !== comerceCif){ // si ninguno de los cif coincide con el del token
            handleHttpError(res, "CIF_NOT_ALLOWED", 403)
            return
        }

        next()
    }catch(err){
        handleHttpError(res, "ERROR_CIF", 403)
    }
}

module.exports = checkCif