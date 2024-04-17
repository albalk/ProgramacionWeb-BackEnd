const mongoose = require('mongoose')

const dbConnect = () => {
    const db_uri = process.env.DB_URI //obtener la uri de la bd
    mongoose.set('strictQuery', false)

    //conectarse a mongo
    try{
        mongoose.connect(db_uri)
    }catch(error){
        console.err("Error conectando a la BD:", error)
    }
    
    //escuchar eventos de conexion
    mongoose.connection.on("connected",() => console.log("Conectado a la BD"))
} 

module.exports = dbConnect