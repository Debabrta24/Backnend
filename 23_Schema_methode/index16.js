const express = require("express")
const app = express()
const main = require("./database")
const bcrypt = require("bcrypt")
const validatorUser = require("./utlitis/validateUser19")
const User = require("./Schema")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const userAuth = require("./middleWare/userAuth")
app.use(express.json())
app.use(cookieParser())



app.get("/register/:id", async (req, res) => {
    id = req.params.id
    try {
        const result = await User.findById(id)
        res.send(result)
    }
    catch (err) {
        cosnole.log(err)
    }
})
app.delete("/register/:id", async (req, res) => {
    id = req.params.id
    try {
        //need to first validate token 

        const result = await User.findByIdAndDelete(id)
        res.send("deleted succ")
    }
    catch (err) {
        cosnole.log(err)
    }
})










app.get("/register", userAuth, async (req, res) => {
    try {
        // const { token } = req.cookies
        // // console.log(token)
        // if (!token) {
        //     throw new Error("token does not exit")
        // }
        // const payload = jwt.verify(token, "secret_key_your")
        // // console.log(payload)
        // const { _id } = payload;
        // if (!id) {
        //     throw new Error("errror id missing ")
        // }
        // const result = await User.find({})
        // if (!result) {
        //     throw new Error("errror result missing ")
        // }
    
        res.send(req.result)
       
    }
    catch (err) {
        console.log(err)
    }
})
app.post("/register", async (req, res) => {
    try {
        //     // this three line is the api level verification handeling 👇👇👇
        //     const mandatoryField = ["firstName", "lastName", "emailId"];
        //     const isAllowed = mandatoryField.every((k) => Object.keys(req.body).includes(k));
        //     if (!isAllowed) {
        //         throw new Error("Fileds missings ")
        //     }
        //     // & if you write this two  line only it is dataBase side handeling 👇👇 

        validatorUser(req.body)
        req.body.password = await bcrypt.hash(req.body.password, 10)  //converting passowrd to hash
        // console.log(req.body)
        await User.create(req.body)
        res.send("User regster successfully")
    }
    catch (error) {
        console.log(error)
    }
})

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