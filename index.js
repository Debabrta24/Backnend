const express = require("express")
const app = express()
app.use((req, res) => {
    res.send("Hello coder army")
})
app.listen(3000, () => {
    console.log("listing as port 3000")
})