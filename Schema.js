const mongoose = require("mongoose") //cretaimg schema then we need to create model means collection create karna  //schema = structure

const userSchema = new mongoose.Schema({   name: String,
    age: {type:Number},
    city: String,
    gender: String
})
const User = mongoose.model("user", userSchema)//creating model  //no need to write await 


module.exports = User;
