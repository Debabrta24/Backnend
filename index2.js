const express = require("express")
const server = express();


server.post("/user",(req,res)=>{
    res.send("data saved successfully")
    console.log("Data saved successfully ")
})

server.use("/", (req, res) => {
    res.send("hello")
    // console.log(req) //there is lotos of data that is came by serevr
})

server.listen(3000, () => {
    console.log("server started")
})