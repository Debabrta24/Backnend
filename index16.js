const express = require("express")
const app = express()
const main = require("./database")
app.use(express.json())

const User = require("./Schema")

app.get("/info", async (req, res) => {
    const result = await User.find({})
    res.send(result)
})
app.post("/info", async (req, res) => {
    try { //alawys put in try catch block 

        // this two line  👇 
        // const ans = new User(req.body)
        // await ans.save()
        // or this  single line 👇
        await User.create(req.body)
    }
    catch (err) {
        res.send(err)
    }
    res.status(200).send("Sussfully sent")
})

app.delete("/info", async (req, res) => {
    await User.deleteOne({ "name": "shivam" })
    res.send("Deleted")
})

app.put("/info", async (req, res) => {
    await User.updateOne({ "name": "Rohit" }, { "name": "Dev" })
    res.send("updated")
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


// 1hour