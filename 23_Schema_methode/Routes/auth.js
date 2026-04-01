const express = require("express")
const app = express()

const userAuth = require("../middleWare/userAuth")
const bcrypt = require("bcrypt")
const authRouter=express.Router();
authRouter.get("/register/:id", async (req, res) => {
    id = req.params.id
    try {
        const result = await User.findById(id)
        res.send(result)
    }
    catch (err) {
        cosnole.log(err)
    }
})
authRouter.delete("/register/:id", async (req, res) => {
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

authRouter.get("/register", userAuth, async (req, res) => {
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
authRouter.post("/register", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

