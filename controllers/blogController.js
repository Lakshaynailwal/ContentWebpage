const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blogs = require("../models/blog");

module.exports.create_get = (req,res)=> res.render("writeblog")

module.exports.create_post = (req,res)=>{
    
    let {title , description , markdown} = req.body;

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token , process.env.SECRET , async(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/logout');
            }
            
            let user = await User.findOne({ _id : decodedToken.id});
            let email = user.email;
            let name = user.name;
            await Blogs.create({title , description , markdown ,email ,name})
            res.redirect("/blog")
        })
    }
    else{
        res.redirect("/logout")
    }

}

module.exports.showblog_get = async(req,res)=>{

    const _id = req.params.id;
    const blog = await Blogs.findOne({_id})
    let context = {
        blog: blog
    }
    res.render("showBlog",context);
}

module.exports.editblog_get = async(req,res)=>{
    const _id = req.params.id;
    const blog = await Blogs.findOne({_id});

    let context = {
        blog:blog
    }
    res.render("editblog",context);
}

module.exports.editblog_put = async(req,res)=>{
    const _id = req.params.id;
    let blog = await Blogs.findOne({_id})
    
    await blog.updateOne({
        _id,
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try{
        await blog.save();
        res.redirect("/blog");
    }catch(e){
        console.log(e);
    }
}

module.exports.delete_get = async(req,res)=>{
    const _id = req.params.id;
    await Blogs.deleteOne({_id})
    res.redirect("/blog");
}