const express = require("express")
const router = express.Router()

const { registerCtrl, loginCtrl, registerComerceCtrl, loginComerceCtrl } = require("../controllers/auth")
const { validatorRegister, validatorLogin, validatorRegisterComerce } = require("../validators/auth")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - User
 *      summary: Registro de usuarios 
 *      description: Registrar un nuevo usuario
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/users"
 *      responses:
 *          '200': 
 *              description: Devuelve el objeto insertado 
 *          '401':
 *              description: Error de validación
 *      security:
 *          - bearerAuth: []
 */

router.post("/register", validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - User 
 *      summary: Login usuario
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Devuelve el objeto insertado
 *          '401':
 *              description: Credenciales incorrectas
 *          '404':
 *              description: Usuario no encontrado
 */

router.post("/login", validatorLogin, loginCtrl) 

/**
 * @openapi
 * /api/auth/registerComerce:
 *  post:
 *      tags:
 *      - Comerce
 *      summary: Registro de comercios 
 *      description: Registrar un nuevo comercio
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comerce"
 *      responses:
 *          '200': 
 *              description: Devuelve el objeto insertado 
 *          '401':
 *              description: Error de validación
 *      security:
 *          - bearerAuth: []
 */

router.post("/registerComerce", authMiddleware, checkRol(["admin"]), validatorRegisterComerce, registerComerceCtrl)

/**
 * @openapi
 * /api/auth/loginComerce:
 *  post:
 *      tags:
 *      - Comerce 
 *      summary: Login comercio
 *      description: ''
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Devuelve el objeto insertado
 *          '401':
 *              description: Credenciales incorrectas
 *          '404':
 *              description: Comercio no encontrado
 */

router.post("/loginComerce", validatorLogin, loginComerceCtrl)

module.exports = router