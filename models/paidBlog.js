const mongoose = require("mongoose");

const paidBlogSchema = mongoose.Schema({
    amount:{
        type:String,
        default:""
    },
    paid:{
        type:String,
        default:""
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    markdown :{
        type:String,
        required: true
    },
})

const paidBlogModel = mongoose.model("paidBlog",paidBlogSchema);

module.exports = paidBlogModel;