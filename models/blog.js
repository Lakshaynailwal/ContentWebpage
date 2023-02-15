const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    name :{
        type:String,
        required:true
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
    date :{
        type:Date,
        default: Date.now
    },
    comments:{
        type:Array,
        default:[]
    },
    image: {
        type:String,
        default:""
    },
    tag: {
        type:String,
        default:""
    }
})

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;