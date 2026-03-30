const moongosh = require("mongoose")

const userSchema = new moongosh.Schema({
    name: String,
    age: Number

})
const User=moongosh.model("user",userSchema)
module.exports=User;