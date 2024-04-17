const express = require("express")
const router = express.Router()

const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users")
const { validatorUpdateUser, validatorGetUser } = require("../validators/users")
const authMiddleware = require("../middleware/session")

router.get("/", getUsers)

router.get("/:email", validatorGetUser, getUser)

router.put("/:email", authMiddleware, validatorGetUser, validatorUpdateUser, updateUser)

router.delete("/:email", authMiddleware, validatorGetUser, deleteUser)

module.exports = router