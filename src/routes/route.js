const express =require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require('../controllers/reviewController')
const { authentication, authorisation } = require('../middleware/auth')


router.post("/register",userController.userCreation)

router.post("/login",userController.userLogin)

router.post("/books",authentication,authorisation,bookController.bookCreation)

router.get("/books",bookController.getBooksQuery)

router.get("/books/:bookId",bookController.bookById)

router.put("/books/:bookId",authentication,authorisation,bookController.updateBook)

router.delete("/books/:bookId",authentication,authorisation,bookController.bookDeletion)

router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

    


module.exports = router


   
