const nodemailer = require("nodemailer");

module.exports.contact_get = (req,res)=>{
    res.render("contact");
}

module.exports.blog_get = (req,res)=>{
    res.render("blogs");
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
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        from: data.email,
        to: "nailwal001@gmail.com",
        subject: data.subject,
        text: data.body
    }

    let resData = {bool : true}

    transporter.sendMail(mailOptions, (err,info)=>{
        if(err){
            resData.bool = false;
        }
        res.json(JSON.stringify(resData));
    })
}