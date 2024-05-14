const express = require("express")
const router = express.Router()

const { getComerces, getComerce, updateComerce, deleteComerce, getWebpages, getWebpage, createWebpage, updateWebpage, updloadImage, deleteWebpage} = require("../controllers/comerce")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const checkCif = require("../middleware/cif")
const { validatorGetComerce, validatorUpdateComerce, validatorCreateWebpage, validatorUpdateWebpage } = require("../validators/comerce")
const uploadMiddleware = require("../utils/handleStorage")

/////////////////////////////////////////////COMERCIOS (CREAR, MODIFICAR, ELIMINAR Y OBTENER)

/**
 * @openapi
 * /api/comerce:
 *  get:
 *      tags:
 *      - Comerce
 *      summary: Obtener comercios 
 *      description: Obtiene un listado de comercios
 *      responses:
 *          '200': 
 *              description: Devuelve el listado de comercios
 *          '403':
 *              description: Error al obtener los comercios 
 */

router.get("/", getComerces)

router.get("/admin", authMiddleware, checkRol(["admin"]), getComerces)


/**
 * @openapi
 * /api/comerce/merchant/{cif}:
 *  get:
 *      tags:
 *      - Comerce
 *      summary: Obtener un comercio 
 *      description: Obtiene un comercio por su cif
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve el comercio
 *          '404':
 *              description: Comercio no encontrado
 */

router.get("/merchant/:cif", validatorGetComerce, getComerce)

/**
 * @openapi
 * /api/comerce/{cif}:
 *  put:
 *      tags:
 *      - Comerce
 *      summary: Actualizar un comercio
 *      description: Actualiza la información de un comercio por su cif
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateComerce"
 *      responses:
 *          '200': 
 *              description: Devuelve el comercio actualizado
 *          '403':
 *              description: Error al actualizar el comercio 
 *      security:
 *          - bearerAuth: [admin]
 */

router.put("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComerce, validatorUpdateComerce, updateComerce)

/**
 * @openapi
 * /api/comerce/{cif}:
 *  delete:
 *      tags:
 *      - Comerce
 *      summary: Eliminar un comercio
 *      description: Elimina un comercio por su cif
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve estado de la eliminación
 *          '403':
 *              description: Error al eliminar el comercio 
 *      security:
 *          - bearerAuth: [admin]
 */

router.delete("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComerce, deleteComerce)

/////////////////////////////////////////////PAGINAS WEB (CREAR, MODIFICAR, ELIMINAR Y OBTENER)

/**
 * @openapi
 * /api/comerce/webpages:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Obtener páginas web 
 *      description: Obtiene un listado de páginas web
 *      parameters:
 *       - in: query
 *         name: order
 *         description: Indica si se debe ordenar la respuesta.
 *         type: boolean
 *       - in: query
 *         name: actividad
 *         description: Se filtra por la actividad de la pagina web.
 *         type: string
 *       - in: query
 *         name: ciudad
 *         description: Se filtra por la ciudad de la pagina web.
 *         type: string
 *      responses:
 *          '200': 
 *              description: Devuelve el listado de páginas web
 *          '403':
 *              description: Error al obtener las páginas web 
 */

router.get("/webpages", getWebpages)

/**
 * @openapi
 * /api/comerce/webpages/{cif}:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Obtener una página web
 *      description: Obtiene una página web por el cif de su comercio
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve la página web
 *          '404':
 *              description: Página web no encontrada 
 */

router.get("/webpages/:cif", validatorGetComerce, getWebpage)

/**
 * @openapi
 * /api/comerce/webpages:
 *  post:
 *      tags:
 *      - Webpage
 *      summary: Crear página web
 *      description: Crea una página web para un comercio
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/webpage"
 *      responses:
 *          '200': 
 *              description: Devuelve la página web creada
 *          '403':
 *              description: Error al crear página web
 *      security:
 *          - bearerAuth: [comerce]
 */

router.post("/webpages", authMiddleware, checkCif, validatorCreateWebpage, createWebpage)

/**
 * @openapi
 * /api/comerce/webpages/{cif}:
 *  put:
 *      tags:
 *      - Webpage
 *      summary: Actualizar página web
 *      description: Actualiza la página web de un comercio por su cif
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateWebpage"
 *      responses:
 *          '200': 
 *              description: Devuelve la página web actualizada
 *          '403':
 *              description: Error al actualizar página web
 *      security:
 *          - bearerAuth: [comerce]
 */

router.put("/webpages/:cif", authMiddleware, checkCif, validatorGetComerce, validatorUpdateWebpage, updateWebpage)

/**
 * @openapi
 * /api/comerce/webpages/upload/{cif}:
 *  put:
 *      tags:
 *      - Webpage
 *      summary: Subir una foto
 *      description: Sube una foto a la página web de un comercio por su cif
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *      responses:
 *          '200': 
 *              description: Imagen subida correctamente
 *          '403':
 *              description: Error al subir la imagen
 *      security:
 *          - bearerAuth: [comerce]
 */

router.put("/webpages/upload/:cif", authMiddleware, checkCif, uploadMiddleware.single("image"), updloadImage)


/**
 * @openapi
 * /api/comerce/webpages/{cif}:
 *  delete:
 *      tags:
 *      - Webpage
 *      summary: Eliminar página web
 *      description: Elimina una página web de un comercio por su cif
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve estado de la eliminación
 *          '403':
 *              description: Error al eliminar página web
 *      security:
 *          - bearerAuth: [comerce]
 */

router.delete("/webpages/:cif", authMiddleware, checkCif, validatorGetComerce, deleteWebpage)

module.exports = router