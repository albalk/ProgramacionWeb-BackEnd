const express = require("express")
const router = express.Router()

const { getUsers, getUser, getInterestedUsers, updateUser, deleteUser } = require("../controllers/users")
const { validatorUpdateUser, validatorGetUser } = require("../validators/users")
const { validatorGetComerce, validatorUpdateWebpageReviews } = require("../validators/comerce")
const { updateWebpageReviews } = require("../controllers/comerce")
const authMiddleware = require("../middleware/session")
const checkReview = require("../middleware/reviews")
const checkCif = require("../middleware/cif")

/**
 * @openapi
 * /api/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Obtener usuarios
 *      description: Obtiene un listado de todos los usuarios
 *      responses:
 *          '200': 
 *              description: Devuelve el listado de usuarios
 *          '401':
 *              description: Error al obtener los usuarios 
 */

router.get("/", getUsers)

/**
 * @openapi
 * /api/users/{email}:
 *  get:
 *      tags:
 *      - User
 *      summary: Obtener un usuario 
 *      description: Obtiene un usuario por su email
 *      parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve el usuario
 *          '404':
 *              description: Usuario no encontrado
 *      security:
 *          - bearerAuth: []
 */

router.get("/:email", validatorGetUser, getUser)

/**
 * @openapi
 * /api/users/{cif}:
 *  get:
 *      tags:
 *      - User
 *      summary: Obtener usuarios interesados
 *      description: Obtiene un listado de usuarios que tengan activada la opción de recibir ofertas y que vivan en la misma ciudad que el comercio registrado
 *      parameters:
 *       - in: path
 *         name: cif
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve el listado de usuarios
 *          '401':
 *              description: Error al obtener los usuarios 
 *      security:
 *          - bearerAuth: [comerce]
 */

router.get("/interested/:cif", authMiddleware, checkCif, getInterestedUsers) //SOLO PARA COMERCIOS REGISTRADOS

/**
 * @openapi
 * /api/users/{email}:
 *  put:
 *      tags:
 *      - User
 *      summary: Actualiza un usuario 
 *      description: Actualiza un usuario por su email
 *      parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateUser"
 *      responses:
 *          '200': 
 *              description: Devuelve el usuario actualizado
 *          '401':
 *              description: Error al actualizar el usuario
 *      security:
 *          - bearerAuth: []
 */

router.put("/:email", authMiddleware, validatorGetUser, validatorUpdateUser, updateUser)

/**
 * @openapi
 * /api/users/{email}:
 *  delete:
 *      tags:
 *      - User
 *      summary: Elimina un usuario 
 *      description: Elimina un usuario por su email
 *      parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *      responses:
 *          '200': 
 *              description: Devuelve estado de la eliminación
 *          '401':
 *              description: Error al eliminar el usuario
 *      security:
 *          - bearerAuth: []
 */

router.delete("/:email", authMiddleware, validatorGetUser, deleteUser)

/**
 * @openapi
 * /api/users/reviews/{cif}:
 *  put:
 *      tags:
 *      - User
 *      summary: Publicar reseña 
 *      description: Publica la reseña en la pagina web de un comercio
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
 *                      $ref: "#/components/schemas/reseña"
 *      responses:
 *          '200': 
 *              description: Devuelve la pagina web con la reseña
 *          '403':
 *              description: Error al publicar la reseña
 *      security:
 *          - bearerAuth: []
 */

router.put("/reviews/:cif", authMiddleware, checkReview, validatorGetComerce, validatorUpdateWebpageReviews, updateWebpageReviews)

module.exports = router