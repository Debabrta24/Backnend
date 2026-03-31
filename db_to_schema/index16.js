const express = require("express")
const app = express()
const main = require("./database")
app.use(express.json())

const User = require("./Schema")

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
        const result = await User.findByIdAndDelete(id)
        res.send("deleted succ")
    }
    catch (err) {
        cosnole.log(err)
    }
})
app.get("/register", async (req, res) => {
    try {
        const result = await User.find({})
        res.send(result)
    }
    catch (err) {
        cosnole.log(err)
    }
})
app.post("/register", async (req, res) => {
    try {
        // this three line is the api level verification handeling 👇👇👇
        const mandatoryField = ["firstName", "lastName", "emailId"];
        const isAllowed = mandatoryField.every((k) => Object.keys(req.body).includes(k));
        if (!isAllowed) {
            throw new Error("Fileds missings ")
        }
        // & if you write this two  line only it is dataBase side handeling 👇👇 
        await User.create(req.body)
        res.send("User regster successfully")
    }
    catch (error) {
        console.log(error)
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