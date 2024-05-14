const { usersModel, comerceModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const getUsers = async (req, res) => {
    try {
        const data = await usersModel.find({}) //busca todos los usuarios
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ALL_USERS', 401)
    }
}

const getUser = async (req, res) => {
    try {
        const { email } = matchedData(req)
        const data = await usersModel.findOne({ email: email })
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_USER', 404)
    }
}

const getInterestedUsers = async (req, res) => {
    try {
        const comercioRegistrado = await comerceModel.findOne({ cif: req.params.cif })
        const data = await usersModel.find({ role: "user", recibirOfertas: true, ciudad: comercioRegistrado.webpage.ciudad })
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_INTERESTED_USERS', 401)
    }
}


//Actualizar sus datos
const updateUser = async (req, res) => {
    try {
        const { email, ...body } = matchedData(req) //Extrae el email y el resto lo asigna a la constante body
        if (req.user.email === email) {
            const data = await usersModel.findOneAndUpdate({ email: email }, body)
            res.send(data)
        }else{
            handleHttpError(res, 'TOKEN_NOT_ALLOWED', 403)
        }


    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_USERS', 401)
    }
}

//Eliminar su cuenta
const deleteUser = async (req, res) => {
    try {
        const { email } = matchedData(req)
        const data = await usersModel.deleteOne({ email: email }); //borrado fisico
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_USERS', 401)
    }
}

module.exports = { getUsers, getUser, getInterestedUsers, updateUser, deleteUser }