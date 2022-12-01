const express =require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require('../controllers/reviewController')
const { authentication, authorization } = require('../middleware/auth')


router.post("/register",userController.userCreation)

router.post("/login",userController.userLogin)

router.post("/books",authentication,bookController.bookCreation)

router.get("/books",bookController.getBooksQuery)

router.get("/books/:bookId",bookController.bookById)

router.put("/books/:bookId",bookController.updateBook)

router.delete("/books/:bookId",authorization,bookController.bookDeletion)

router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

    


module.exports = router


   
