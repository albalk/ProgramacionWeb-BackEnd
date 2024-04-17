const { comerceModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

//COMERCIOS

//Listar las paginas web de los comercios
const getComerces = async (req, res) => {
    try {
        const comerce = req.comerce
        const data = await comerceModel.find({}) //busca todos los comercios
        res.send({data, comerce}) //envia la respuesta
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ALL_COMERCES', 403)
    }
}

const getComerce = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        const data = await comerceModel.findOne({cif:cif})
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_GET_COMERCE', 403)
    }
}

const updateComerce = async (req, res) => {
    try {
        const {cif, ...body} = matchedData(req) //Extrae el cif y el resto lo asigna a la constante body
        const data = await comerceModel.findOneAndUpdate({cif:cif}, body)
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_COMERCE', 403)
    }
}

const deleteComerce = async (req, res) => {
    try {
        const {cif} = matchedData(req)
        const data = await comerceModel.deleteOne({cif:cif}); //borrado fisico
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_DELETE_COMERCE', 403)
    }
}

//PAGINAS WEB

//Obtener todas las paginas web
const getWebpages = async (req, res) => {
    try {
        const webpage = req.webpage
        const data = await comerceModel.find({}, { webpage: 1 }, (error, comerces) => {
            if (error) {
                console.log(error);
            } else {
                console.log(comerces);
            }
        
        }); //Buscar todos los comercios y devolver solo el campo "webpage"
        res.send({data, webpage}); //Enviar la respuesta con los datos
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_WEBPAGES', 403); //Manejar el error y enviar una respuesta de error
    }
}

//Obtener la página web de un comercio
const getWebpage = async (req, res) => {
    try {
        const { cif } = matchedData(req); //Obtener el CIF del cuerpo de la solicitud
        const data = await comerceModel.findOne({ cif: cif }, { webpage: 1 }); //Buscar el comercio con el CIF dado y devolver solo el campo "webpage"
        res.send(data); //Enviar la respuesta con los datos
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_WEBPAGE', 403); //Manejar el error y enviar una respuesta de error
    }
}

//Crear una página web para un comercio
const createWebpage = async (req, res) => {
    try {
        const { cif, webpage } = matchedData(req); //Obtener los datos del cuerpo de la solicitud
        const data = await comerceModel.findOneAndUpdate({ cif: cif }, { webpage: webpage }, { new: true }); //Buscar y actualizar el comercio con el CIF dado, estableciendo el campo "webpage" con los datos proporcionados
        res.send(data); //Enviar la respuesta con los datos actualizados
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_WEBPAGE', 403); //Manejar el error y enviar una respuesta de error
    }
}

//Actualizar la página web de un comercio
const updateWebpage = async (req, res) => {
    try {
        const { cif, webpage } = matchedData(req);
        const data = await comerceModel.findOneAndUpdate({ cif: cif }, { webpage: webpage });
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE', 403);
    }
}

//Eliminar la página web de un comercio
const deleteWebpage = async (req, res) => {
    try {
        const { cif } = matchedData(req); // Obtener el CIF del cuerpo de la solicitud
        const data = await comerceModel.findOneAndUpdate({ cif: cif }, { webpage: null }, { new: true }); // Buscar y actualizar el comercio con el CIF dado, estableciendo el campo "webpage" como null para eliminar los datos
        res.send(data); // Enviar la respuesta con los datos actualizados
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_WEBPAGE', 403); // Manejar el error y enviar una respuesta de error
    }
}


module.exports = { getComerces, getComerce, updateComerce, deleteComerce, getWebpages, getWebpage, createWebpage, updateWebpage, deleteWebpage}