const express = require("express")
const router = express.Router()

const { registerCtrl, loginCtrl, registerComerceCtrl, loginComerceCtrl } = require("../controllers/auth")
const { validatorRegister, validatorLogin, validatorRegisterComerce } = require("../validators/auth")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const checkCif = require("../middleware/cif")

//registra un usuario
router.post("/register", validatorRegister, registerCtrl)

//login de usuario
router.post("/login", validatorLogin, loginCtrl) 

//registra un comercio
router.post("/registerComerce", authMiddleware, checkRol(["admin"]), validatorRegisterComerce, registerComerceCtrl)

//login de comercio
router.post("/loginComerce", validatorLogin, loginComerceCtrl)

module.exports = router