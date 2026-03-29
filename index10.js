const express = require("express")
const app = express()
app.use(express.json())




const FoodMenu = [
    { id: 1, food: "food1", catagory: "catagory", price: 1 },
    { id: 2, food: "food2", catagory: "catagory", price: 2 },
    { id: 3, food: "food3", catagory: "catagory", price: 3 },
    { id: 4, food: "food4", catagory: "catagory", price: 4 },
    { id: 5, food: "food5", catagory: "catagory", price: 5 },
    { id: 6, food: "food6", catagory: "catagory", price: 6 },
    { id: 7, food: "food7", catagory: "catagory", price: 7 },
    { id: 8, food: "food8", catagory: "catagory", price: 8 },
    { id: 9, food: "food9", catagory: "catagory", price: 9 },
    { id: 10, food: "food10", catagory: "catagory", price: 10 }
]



app.get("/food", (req, res) => {
    res.send(FoodMenu)
})




app.listen(3000, () => {
    console.log("server started")
})