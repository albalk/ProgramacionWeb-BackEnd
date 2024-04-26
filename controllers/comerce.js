const { comerceModel } = require("../models")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')

//COMERCIOS

//Listar las paginas web de los comercios
const getComerces = async (req, res) => {
    try {
        const data = await comerceModel.find({}) //busca todos los comercios
        res.send(data) //envia la respuesta
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
        handleHttpError(res, 'ERROR_GET_COMERCE', 404)
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
        let data //como puede tomar valores distintos dependiendo del parametro query, es let en vez de const
        
        //variables de filtros
        const order = req.query.order //ordenar por scoring
        const actividad = req.query.actividad //filtrar por actividad
        const ciudad = req.query.ciudad //filtrar por ciudad

        if (order === "true") { //si es true
            //lista y ordena por el cif de forma ascendente, ignorando las webpage que sean "null"
            data = await comerceModel.find({ webpage: { $ne: null } }, { webpage: 1 }).sort({ 'webpage.scoring_total': -1})
        }else if(order !== "true" && order !== undefined){ //si el orden no es true y no es undefined
            handleHttpError(res, "QUERY_NOT_ALLOWED", 403)
        }else if (actividad || ciudad) { //si actividad tiene valor
            data = await comerceModel.find(
                {
                    webpage: { $ne: null }, //si el objeto "webpage" no es null
                    "webpage.actividad": { $regex: new RegExp(actividad, "i") },
                    "webpage.ciudad": { $regex: new RegExp(ciudad, "i") }
                },
                { webpage: 1 } //devuelve solo el campo "webpage" y no el comercio entero
            );
        }else{ //si es otra cosa
            data = await comerceModel.find({ webpage: { $ne: null } }, { webpage: 1 })
        }
        
        res.send(data); //Enviar la respuesta con los datos
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_WEBPAGES', 403); //Manejar el error y enviar una respuesta de error
    }
}

//Obtener la página web de un comercio
const getWebpage = async (req, res) => {
    try {
        const { cif } = matchedData(req); //Obtener el CIF del cuerpo de la solicitud
        const data = await comerceModel.findOne({ cif: cif }); //Buscar el comercio con el CIF dado y devolver solo el campo "webpage"
        res.send(data); //Enviar la respuesta con los datos
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_WEBPAGE', 404); //Manejar el error y enviar una respuesta de error
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
        const data = await comerceModel.findOneAndUpdate(
            { cif: cif }, { 
                $push: { //añade el texto al final del array
                    "webpage.textos": webpage.textos,
                    //"webpage.fotos": webpage.fotos
                }
            },
            { webpage: webpage }
        )
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE', 403);
    }
}


const updloadImage = async (req, res) => {
    try{
        const cif = req.params.cif
        const image = req.file
        const data = await comerceModel.findOneAndUpdate(
            { cif: cif }, {
                $push: {
                    "webpage.fotos": image.filename
                }
            }
        )
        res.send(data.webpage)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPLOAD_IMAGE', 403)
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

//actualizar las reseñas de un comercio
const updateWebpageReviews = async (req, res) => {
    try {
        
        const { cif, webpage } = matchedData(req); //Obtener el CIF y los datos de la solicitud
        
        const comercio = await comerceModel.findOne({ cif: cif }); //Buscar el comercio con el CIF dado
        
        const newScoringTotal = (comercio.webpage.scoring.reduce((a, b) => a + b, 0) + req.body.webpage.scoring) / (comercio.webpage.numPuntuaciones + 1) //Calcular la nueva puntuación total

        const data = await comerceModel.findOneAndUpdate( //Buscar y actualizar el comercio con el CIF dado, estableciendo el campo "webpage" con los datos proporcionados
            { cif: cif }, 
            { 
                $inc: { //incrementa el numero de puntuaciones
                    "webpage.numPuntuaciones": 1,
                },
                $push: { //añade la reseña y puntuacion al final del array
                    "webpage.scoring": webpage.scoring,
                    "webpage.reseñas": webpage.reseñas
                },
                $set: { //Establecer la nueva puntuación total con el calculo del scoring
                    "webpage.scoring_total": newScoringTotal
                }
            },
            { new: true, projection: { cif:1, webpage: 1 }} //projetion hace que solo se devuelva el cif y webpage del comercio
        );
        res.send(data); //Enviar la respuesta con los datos actualizados
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_WEBPAGE_REVIEWS', 403); //Manejar el error y enviar una respuesta de error
    }
}


module.exports = { getComerces, getComerce, updateComerce, deleteComerce, getWebpages, getWebpage, createWebpage, updateWebpage, updloadImage, deleteWebpage, updateWebpageReviews }