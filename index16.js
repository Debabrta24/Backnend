const express = require("express")
const app = express()
const main = require("./database")
app.use(express.json())




main()
    .then(() => {
        app.listen(3000, () => {
            console.log("server started")
        })

    })
    .catch((err) => {
        console.log(err)
    })
