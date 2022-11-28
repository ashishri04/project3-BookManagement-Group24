const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const invalidInput = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
    if(typeof value !== "string") return false
return true;
}



function isValidtitle(title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const validatePhone = function (phone) {
    var re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (typeof (phone) == 'string') {
        return re.test(phone.trim())
    } else {
        return re.test(phone)
    }
};

const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/.test(email)
    return regex
}
const isValidPassword = function (password) {
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    return passwordRegex.test(password);
  };
module.exports = {isValidRequestBody,invalidInput,isValidtitle,validatePhone,isValidEmail,isValidPassword}