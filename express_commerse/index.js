import Database from '../databaseJson/jsonDatabase'
import express from "express"


function ProductDatabase(){
    let Products = new Database()
    return Products
}
function OrderDatabase(){
    let Orders = new Database()
    return Orders
}

const app = express()

const PORT = 3000


app.get('/', (req,res)=>{
    res.send("Home page")
})


app.get('/search',async(req,res)=>{
    let Products = ProductDatabase()
    await Products.useDatabase("Product")
    await Products.createTable("ProductList")
    const data = await Products.readAllRecords()
    console.log(data);
    // let ProductsArray = []
    // ProductsArray = data.filter
})


app.listen(PORT,()=>{
    console.log("Listining on port"+PORT);
})
