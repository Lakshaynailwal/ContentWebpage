const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


const Connect =  ()=>(
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Succesfully connected to db");
    }).catch((e)=>{
        console.log(e);
    })
)    

module.exports = Connect;