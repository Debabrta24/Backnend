const express = require("express")
const app = express()
const main = require("./database")
const bcrypt = require("bcrypt")
const validatorUser = require("./utlitis/validateUser19")
const User = require("./Schema")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const authRouter = require("./Routes/auth")
const { radisClient, connectRadis } = require("./config/radis")
const userAuth = require("./middleWare/userAuth")
const rateLimiter=require("./middleWare/rateLimmtter")
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
        
        // await radisClient.set(`token:${token}`, "Blocked")
   
    }
    catch (err) {
        console.log(err)
    }
})

authRouter.post("/logout", userAuth, async (req, res) => {
    try {
        const { token } = req.cookies
        console.log(token)
        const payload = jwt.decode(token) // finding the expiry time 
        console.log(payload)
        await radisClient.set(`token:${token}`, "Blocked")
        await radisClient.expireAt(`token:${token}`, payload.exp)
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
    .then(async () => {
        // this is allow to run parallaly two function 👇👇
        await Promise.all([connectRadis(), app.listen(3000, () => {
            console.log("server started")
        })]) // this is allow to run parallay 👆👆
        // or this 👇👇
        // cradisClient()
        // app.listen(3000, () => {
        //     console.log("server started")
        // })
        // or this 👆👆
        // const result = await User.find({})
        // console.log(result)

    })
    .catch((err) => {
        console.log(err)
    })