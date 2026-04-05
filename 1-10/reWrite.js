const express = require("express")
const app = express();
app.use("/", (req, res) => {
    res.send("welcome")
})
app.listen(4000, () => {
    console.log("listing at 4000")
})