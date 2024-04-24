const express = require("express")
const cors = require("cors")
require('dotenv').config(); //obtiene las variables del archivo .env

const app = express()
const dbConnect = require('./config/mongo') //obtiene la configuración del archivo mongo.js

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain
app.use(cors())
app.use(express.json())
app.use("/api", require("./routes")) //Lee routes/index.js por defecto

const port = process.env.PORT || 4000 //establece el puerto (del archivo .env o el puesto 4000)

//inicia el servidor
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()

//documentacion swagger
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

app.use(
    "/api-docs",swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)
app.use("/api", require("./routes"))

//logs con slack
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")

//todo lo que pase por app (solo errores de server)
morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})

module.exports = app