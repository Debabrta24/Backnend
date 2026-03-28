const express = require("express")
const app = express();
app.use(express.json());

// all about middle ware

app.use("/", (req, res, next) => {
    res.send("Hello ji")
    console.log(1)
    next()
}, (req, res) => {
    console.log(2)
    // res.send("Hello ji2")  //not possible two response sending 
}
)
app.listen(3000, () => {
    console.log("server started at 3000")
})