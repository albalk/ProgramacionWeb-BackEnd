const { usersModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

const getUsers = async (req, res) => {
    try{
        const user = req.user
        const data = await usersModel.find({})
        res.send({data, user})
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ALL_USERS')
    }
}

const getUser = async (req, res) => {
    try{
        const {email} = matchedData(req)
        const data = await usersModel.findOne({email:email})
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_USER')
    }
}


//Actualizar sus datos
const updateUser = async (req, res) => {
    try{
        const {email, ...body} = matchedData(req) //Extrae el email y el resto lo asigna a la constante body
        const data = await usersModel.findOneAndUpdate({email:email}, body)
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_USERS')
    }
}

//Eliminar su cuenta
const deleteUser = async (req, res) => {
    try {
        const {email} = matchedData(req)
        const data = await usersModel.deleteOne({email:email}); //borrado fisico
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_USERS')
    }
}

module.exports = { getUsers, getUser, updateUser, deleteUser }