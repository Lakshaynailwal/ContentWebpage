require("dotenv").config()

const express = require("express")
const port = process.env.PORT||5000;

const app = express();

app.set("view engine", "ejs")
app.set("views", "templates")

app.get("/",async(req,res)=>{
    res.render("index.ejs")
})


app.listen(port,()=>{
    console.log(`Succesfully running at PORT : ${port}`)
})