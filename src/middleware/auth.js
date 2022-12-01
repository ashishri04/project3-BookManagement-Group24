const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const valid=require("../validation/validation")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(401).send({ status: false, msg: " token must be present for authentication " })

        jwt.verify(token, "secret", function (err, decodedToken) {
            if (err) {
                return res.status(400).send({ status: false, msg: "token invalid" });
            } 
        
                req.decodedToken = decodedToken
                next() 
        })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const authorization = async (req, res, next) => {
    try {
        const bookId = req.params.bookId
        console.log(bookId)

        if (!valid.isValidObjectId(bookId))
            return res.status(400).send({ status: false, message: `This bookId is Invalid` });
            
        const token = req.headers["x-api-key"];

        if (!token)
            return res.status(400).send({ status: false, message: 'Token must be present' })

        const decodedToken = jwt.verify(token, "secret", function (err) {
            if (err) {
                return res.status(400).send({ status: false, msg: "token invalid" });
            }} )
        console.log(decodedToken.userId)
        
        if (!decodedToken)
            return res.status(400).send({ status: false, message: 'Provide your own token' })
        
        const book = await bookModel.findById(bookId)
        console.log(book)
        console.log(book.userId)
        
        
        if (decodedToken.userId != book.userId)
            return res.status(400).send({ status: false, message: 'You are not authorized' })

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports={authentication,authorization}