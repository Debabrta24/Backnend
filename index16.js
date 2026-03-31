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
        await User.findByIdAndUpdate(_id,update)
        res.send("updated")
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