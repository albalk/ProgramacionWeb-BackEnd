const express = require("express")
const router = express.Router()

const { getComerces, getComerce, updateComerce, deleteComerce, getWebpages, getWebpage, createWebpage, updateWebpage, deleteWebpage} = require("../controllers/comerce")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")
const checkCif = require("../middleware/cif")
const { validatorGetComerce, validatorUpdateComerce, validatorCreateWebpage } = require("../validators/comerce")

//COMERCIOS (CREAR, MODIFICAR, ELIMINAR Y OBTENER)
router.get("/", getComerces)

router.get("/:cif", validatorGetComerce, getComerce)

router.put("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComerce, validatorUpdateComerce, updateComerce)

router.delete("/:cif", authMiddleware, checkRol(["admin"]), validatorGetComerce, deleteComerce)

//PAGINAS WEB (CREAR, MODIFICAR, ELIMINAR Y OBTENER)
router.get("/webpages", getWebpages)

router.get("/webpages/:cif", validatorGetComerce, getWebpage)

router.post("/webpages", authMiddleware, checkCif, validatorCreateWebpage, createWebpage)

router.put("/webpages/:cif", authMiddleware, checkCif, validatorGetComerce, validatorCreateWebpage, updateWebpage)

router.delete("/webpages/:cif", authMiddleware, checkCif, validatorGetComerce, deleteWebpage)


module.exports = router