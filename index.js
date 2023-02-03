const express = require("express")
const PORT = 5000;

const app = express();

app.get("/",async(req,res)=>{
    res.send("hi there");
})

app.listen(PORT,()=>{
    console.log(`Succesfully running at PORT : ${PORT}`)
})