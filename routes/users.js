const express = require("express")
const router = express.Router()

const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users")
const { validatorUpdateUser, validatorGetUser } = require("../validators/users")
const { validatorGetComerce, validatorUpdateWebpageReviews } = require("../validators/comerce")
const { updateWebpageReviews } = require("../controllers/comerce")
const authMiddleware = require("../middleware/session")
const checkReview = require("../middleware/reviews")
const checkCif = require("../middleware/cif")

router.get("/:cif", authMiddleware, checkCif, getUsers) //SOLO PARA COMERCIOS REGISTRADOS

router.get("/:email", validatorGetUser, getUser)

router.put("/:email", authMiddleware, validatorGetUser, validatorUpdateUser, updateUser)

router.delete("/:email", authMiddleware, validatorGetUser, deleteUser)

router.put("/reviews/:cif", authMiddleware, checkReview, validatorGetComerce, validatorUpdateWebpageReviews, updateWebpageReviews)

module.exports = router