const express = require("express")
const app = express();
const { Server } = require("socket.io")
const http = require("http");
const path = require("path");

const server = http.createServer(app)
const io = new Server(server)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
// io.on("connection", (data) => {
//     io.emit("new-message", data)
// })
// io.on("disconnect", () => {
//     console.log("disconnected")
// })

server.listen(3000, () => {
    console.log(" sever started at 3000")
})
  