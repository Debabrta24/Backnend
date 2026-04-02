const express = require("express")
const app = express()
app.use(express.json())
const main = require("./index")

const chattingHistory = {} // stroing the prevuios answer as a context



app.post("/chat", async (req, res) => {
    const { id, msg } = req.body
    console.log(msg)
   
    if (!chattingHistory[id]) {
        chattingHistory[id] = []
    }
    const History=chattingHistory[id];
    const promptmesssage=[...History,{
        role:"user",
        parts:[{text:msg}]
    }]
     const data = await main(promptmesssage)
    res.send(data)

})
app.listen(3000, () => {
    console.log("server started")
})