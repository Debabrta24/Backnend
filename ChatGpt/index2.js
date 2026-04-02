
const express = require("express")
const app = express()
app.use(express.json())

const main = require("./index")

const chattingHistory = {}

app.post("/chat", async (req, res) => {
    try {
        const { id, msg } = req.body

        if (!chattingHistory[id]) {
            chattingHistory[id] = []
        }

        const History = chattingHistory[id]

        const promptmesssage = [
            ...History,
            {
                role: "user",
                parts: [{ text: msg }]
            }
        ]

        const data = await main(promptmesssage)
        const text =
            typeof data === "string"
                ? data
                : data?.response?.text?.() || JSON.stringify(data)

        History.push({ role: "user", parts: [{ text: msg }] })
        History.push({ role: "model", parts: [{ text }] })



        res.send(text)

    } catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})