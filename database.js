const mongoose = require("mongoose")
const userSchema = require("./Schema")

async function main() {
    console.log("db sonnected")
    await mongoose.connect("mongodb://localhost:27017/dbLecture16")
    const User = mongoose.model("user", userSchema)//creating model  //no need to write await 
    // const user1 = new User({ name: "Rohit", age: 20, city: "kolkata", gender: "Male" }) //single insertion line1
    //   await userMany.save(); //single insertion  line2
    await User.insertMany([{ name: "Rohit3", age: 20, city: "kolkata", gender: "Male3" },
    { name: "Rohit2", age: 20, city: "kolkata2", gender: "Male2" }]) //multiple insertion 

    const answer = await User.find({ name: "Rohit" }); // find somthing from db
    // console.log(answer)

}

module.exports = main;