const nodemailer = require("nodemailer");
const blogs = require("../models/blog");
const jwt = require("jsonwebtoken");

module.exports.contact_get = (req,res)=>{
    res.render("contact");
}

module.exports.blog_get = async (req,res)=>{
    
    let blogList = await blogs.find().sort({date :"desc"});
    let context = {
        blogs : blogList
    }
    res.render("blogs" , context);
}

module.exports.send_get = (req,res)=>{
    res.send("done");
}

module.exports.send_post = (req,res) =>{
    const data = req.body;

    if(!data.subject){
        data.subject = `Message from ${data.email}`;
    }
    
    const transporter = nodemailer.createTransport({
        service:"gmail",
        pool:true,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: data.email,
        to: "info@contentbazzaar.com",
        subject: data.subject,
        text: data.body
    }

    let resData = {bool : true}
    transporter.sendMail(mailOptions, (err,info)=>{
        transporter.close();
        if(err){
            console.log(err)
            resData.bool = false;
        }
    })
    res.json(JSON.stringify(resData));
}


module.exports.sendquote_post = (req,res) =>{
    const data = req.body;

    if(!data.subject){
        data.subject = `Message from ${data.email}`;
    }
    
    if(data.org){
        data.subject += ` from ${data.org}`;
    }

    data.body += `  contact us at : ${data.phone} `

    const transporter = nodemailer.createTransport({
        service:"gmail",
        pool:true,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: data.email,
        to: "info@contentbazzaar.com",
        subject: data.subject,
        text: data.body
    }

    let resData = {bool : true}
    transporter.sendMail(mailOptions, (err,info)=>{
        transporter.close();
        if(err){
            console.log(err)
            resData.bool = false;
        }
    })
    res.json(JSON.stringify(resData));
}

module.exports.get_quote = (req,res)=>{res.render("contact")}