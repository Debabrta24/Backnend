const express = require("express")
const app = express()
app.use(express.json())

app.use("/",(req,res)=>{
    res.send("server started")
})

app.listen(3000, () => {
    console.log("server started")
})