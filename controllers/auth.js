const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const { handleHttpError } = require("../utils/handleError")
const { usersModel, comerceModel } = require("../models")

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body)
        //Si no queremos que se devuelva el hash con "findOne", en el modelo de users ponemos select: false en el campo password
        //Además, en este caso con "create", debemos setear la propiedad tal que:  
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select("password name role email")

        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const registerComerceCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await comerceModel.create(body)
        //Si no queremos que se devuelva el hash con "findOne", en el modelo de users ponemos select: false en el campo password
        //Además, en este caso con "create", debemos setear la propiedad tal que:  
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_COMERCE")
    }
}

const loginComerceCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await comerceModel.findOne({ email: req.email }).select("password name role email cif")

        if(!user){
            handleHttpError(res, "COMERCE_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_COMERCE")
    }
}

module.exports = { registerCtrl, loginCtrl, registerComerceCtrl, loginComerceCtrl }