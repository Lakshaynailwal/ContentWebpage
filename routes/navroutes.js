const {Router} = require('express');
const router = Router();
const {checkAuth} = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");

router.get("/blog" ,checkAuth, (req,res)=>{
    res.render("blogs");
})
router.get("/contact" , (req,res)=>{
    res.render("contact");
})

router.get("/send", (req,res) =>{
    res.send("done");
})

router.post("/send" , (req,res) =>{
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

})

module.exports = router;