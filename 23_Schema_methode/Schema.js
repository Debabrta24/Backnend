const mongoose = require("mongoose") //cretaimg schema then we need to create model means collection create karna  //schema = structure

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlenght: 3,// min for string
        maxlenght: 9
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    emailId: {
        type: String,
        unique: true, // check if any double is present or not 
        lowercase:true //convert all digit in lower caase
    },
    password: {
        type: String
    },
    photo: {
        type: String,
        default: "##" //if user not give any value then this save as default value
    },
    age: {
        type: Number,
        min: 14, // min 
        max: 70 //max
    }
},{
    timestamps:true // it save automatically all time
})
const User = mongoose.model("user", userSchema)//creating model  //no need to write await 


module.exports = User;
