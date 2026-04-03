const express = require("express")
const app = express()
app.use(express.json())

const aiMain = require("./aiMain")

app.post("/", async (req, res) => {
    const msg = req.body.msg
    console.log(msg)
    const answer = await aiMain(msg)
    res.send(answer)
})






app.listen(3000, () => {
    console.log("server strted")
})

