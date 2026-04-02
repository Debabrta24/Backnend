const validator = require("validator")
const User = require("../Schema")
async function validatorUser(data) {
    // console.log(data)
    // this three line is the api level verification handeling 👇👇👇
    const mandatoryField = ["firstName", "lastName", "emailId" ,"password"];
    const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));
    if (!isAllowed) {
        throw new Error("Fileds missings ")
    }
    if (!validator.isEmail(data.emailId)) {
        throw new Error("Invaild Email")
    }
    
    // if (!validator.isStrongPassword(data.emailId)) {
    //     throw new Error("week passsword")
    // }
    // & if you write this two  line only it is dataBase side handeling 👇👇 
    

}

module.exports = validatorUser