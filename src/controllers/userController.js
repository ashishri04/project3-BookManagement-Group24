const userModel = require("../models/userModel")
const valid = require("../validation/validation")

const userCreation = async (req, res) => {

    try {
        let requestBody = req.body

        const { title, name, phone, email, password, address } = requestBody
        if (!valid.isValidRequestBody) {
            return res.status(400).send({ status: false, msg: "Pls  request body can't be Empty" })
        }
        if (!name) {
            return res.status(400).send({ status: false, msg: "Name is Mandatory" })
        }
        if (!title) {
            return res.status(400).send({ status: false, msg: "title is Mandatory" })
        }
        if (!phone) {
            return res.status(400).send({ status: false, msg: "phone is Mandatory" })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: "email is Mandatory" })
        }


        if (!valid.invalidInput(title)) {
            return res.status(400).send({ status: false, msg: "tittle Can't be empty" })
        }

        if (!valid.isValidtitle(title)) {
            return res.status(400).send({ status: false, msg: "title should be MR,MRs,Miss" })
        }
        if (!valid.invalidInput(name)) {
            return res.status(400).send({ status: false, msg: "name Can't be empty" })
        }

        if (!valid.invalidInput(phone)) {
            return res.status(400).send({ status: false, msg: "phone Can't be empty" })
        }
        if (!valid.validatePhone(phone)) {
            return res.status(400).send({ status: false, msg: "pls provide correct phone  number" })
        }

        const usedPhone = await userModel.findOne({ phone })
        if (usedPhone) {
            return res.status(400).send({ status: false, msg: " Phone is already register" })
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "email is mandatory" })
        }
        if (!valid.invalidInput(email)) {
            return res.status(400).send({ status: false, msg: "email Can't be empty" })
        }
        if (!valid.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "Invalid email id" })

        }
        const usedEmail = await userModel.findOne({ email })
        if (usedEmail) {
            return res.status(400).send({ status: false, msg: "Email is already register" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "password is Mandatory" })
        }
        if (!valid.isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "password shpuld be of length 8-15 " })
        }
        if (!address) {
            return res.status(400).send({ status: false, msg: "address is Mandatory" })
        }
        if (!valid.invalidInput(address.street)) {
            return res.status(400).send({ status: false, msg: " Pls provide street name " })
        }
        if (!valid.invalidInput(address.city)) {
            return res.status(400).send({ status: false, msg: " Pls provide city name " })
        }
        if (!valid.invalidInput(address.pincode)) {
            return res.status(400).send({ status: false, msg: " Pls provide pincode " })
        }

        const createUser = await userModel.create(requestBody)
        return res.status(200).send({ status: true, msg: " user created successfully", data: createUser })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }

}


module.exports = { userCreation }