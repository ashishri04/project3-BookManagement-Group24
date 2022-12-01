const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")


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
        
            let token = req.headers["x-api-key"];
            let decodedToken = jwt.verify(token, "secret")
    
            let bookId = req.params.bookId
            if (bookId) {
    
             let userId =    await bookModel.find({ _id: bookId }).select({ userId: 1, _id: 0 })
 
    
                let id = decodedToken.userId
                if (id != userId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
            }
            else {
                let userID = req.body.userId
                let ID = decodedToken.userId
                
    
                if (ID!= userID) return res.status(403).send({ status: false, msg: 'You are not authorised to perform this task' })
            }
    
            next();
    }    

    catch (err) {
        res.status(500).send({ status: false, error: err.message }) 
    }

}


module.exports={authentication,authorization}