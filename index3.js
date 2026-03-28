const express = require("express")
const app = express()
app.use(express.json())

const bookStore = [
    {
        id: 1,
        name: "harry potter",
        auther: "DevFlux"
    },
    {
        id: 2,
        name: "Friends",
        author: "Vikash"
    }, {
        id: 3,
        name: "premKhani",
        author: "Dev"

    }
]
app.get("/book", (req, res) => {
    res.send(bookStore)
})
app.patch("/book", (req, res) => {
    res.send("Patch updated")
    const id1 = req.body.id
    const Book = bookStore.find(info => info.id === id1)
    if (req.body.auther) {
        Book.author = req.body.author
    }
    if (req.body.name) {
        Book.name = req.body.name
    }
    console.log(bookStore)
})

app.listen(3000, () => {
    console.log("server started")
})