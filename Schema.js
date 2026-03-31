const mongoose = require("mongoose") //cretaimg schema then we need to create model means collection create karna  //schema = structure

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    photo: {
        type: String
    },
    age: {
        type: Number,
        min: 14,
        max: 70
    }
})
const User = mongoose.model("user", userSchema)//creating model  //no need to write await 


module.exports = User;
