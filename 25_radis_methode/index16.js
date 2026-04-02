const express = require("express")
const app = express()
const main = require("./database")
const bcrypt = require("bcrypt")
const validatorUser = require("./utlitis/validateUser19")
const User = require("./Schema")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const authRouter = require("./Routes/auth")
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.post("/login", async (req, res) => {
    try {

        // validatorUser(req.body)
        const people = await User.findOne({ "emailId": req.body.emailId })

        // if (!(req.body.emailId == people.emailId)) {
        //     throw new Error("invaild ")
        // }
        const check = await bcrypt.compare(req.body.password, people.password)
        if (!check) { throw new Error("invaild ") }
        // console.log(people)
        const token = jwt.sign({ _id: people._id, emailId: people.emailId }, "secret_key_your", { expiresIn: 1000 })
        res.cookie("token", token) //cookies 
        res.send("login done")
    }
    catch (err) {
        console.log(err)
    }
})


authRouter.post("/logout",  (req, res) => {
    try {
        res.cookie("token", "dwsefw")
        res.send("log out succefully")
    }
    catch (err) {
        console.log(err)
    }
})

app.use("/", authRouter)




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