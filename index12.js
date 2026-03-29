const express = require("express")
const app = express()
app.use(express.json())



app.get("/food", (req, res) => {
    res.send(FoodMenu)
})




app.listen(3000, () => {
    console.log("server started")
})