const mongoose = require("mongoose");

const faqSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    }
})


const faqsModel = mongoose.model("faq",faqSchema);

module.exports = faqsModel;