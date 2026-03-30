const express = require("express")
const app = express()
app.use(express.json())
const main = require("./dataBase")
const user = require("./Schema")

app.get("/info", async (req, res) => {
    const result = await user.find({})
    res.send(result)
})

app.post("/info", async (req, res) => {
    await user.create(req.body)
    res.send("added")
})

//same like others operation del,put ,patch
main()
    .then(() => {
        app.listen(3000, () => {
            console.log("server started")
        })
    })
    .catch((err) => {
        console.log(err)
    })