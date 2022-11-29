const express =require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require('../controllers/reviewController')


router.post("/register",userController.userCreation)

router.post("/login",userController.userLogin)

router.post("/books",bookController.bookCreation)

router.get("/books",bookController.getBooksQuery)

router.get("/books/:bookId",bookController.bookById)

router.put("/books/:bookId",bookController.updateBook)




module.exports =router
