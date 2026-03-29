const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({//cretaimg schema then we need to create model means collection create karna  //schema = structure

    name: String,
        age: Number,
        city: String,
        gender: String
    })

module.exports=userSchema