const express = require("express")
const app = express()
const main = require("./database")
const bcrypt = require("bcrypt")
const validatorUser = require("./utlitis/validateUser19")
const User = require("./Schema")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const authRouter = require("./Routes/auth")
const userAuth = require("./middleWare/userAuth")
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())


app.use("/",userAuth)


app.patch("/user", async (req, res) => {
    try {
        const { _id, ...update } = req.body /// rebenber this must 
        await User.findByIdAndUpdate(_id, update, { "runValidators": true }) //it take three parammer ,
        res.send("updated")  // runVaildator is verify schema before savings
    }
    catch (err) {
        console.log(err)
    }
})







main()
    .then(() => {
        app.listen(3000, () => {
            console.log("server started")
        })
        // const result = await User.find({})
        // console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })