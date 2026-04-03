const express = require("express")
const app = express()
app.use(express.json())

const aiMain = require("./aiMain")


const chattingHistory = {};











app.post("/chat", async (req, res) => {

    const { id, msg } = req.body
    console.log(msg)
    if (!chattingHistory[id]) {
        chattingHistory[id] = [];
    }
    const History = chattingHistory[id]
    const promptmessage = [...History, {
        role: "user",
        parts: [{ text: msg }]
    }]
    const answer = await aiMain(promptmessage)
    History.push({ role: "user", parts: [{ text: msg }] })
    History.push({ role: "model", parts: [{ text: answer }] })
    res.send(answer)
})






app.listen(3000, () => {
    console.log("server strted")
})

