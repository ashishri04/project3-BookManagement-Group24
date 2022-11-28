const express =require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")


router.post("/register",userController.userCreation)
router.post("/login",userController.userLogin)

router.post("/books",bookController.bookCreation)

module.exports =router