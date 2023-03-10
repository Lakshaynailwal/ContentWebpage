const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blogs = require("../models/blog");
const paidBlog = require("../models/paidBlog")
const { ObjectId } = require("mongodb");

module.exports.create_get = (req, res) => res.render("writeblog")

module.exports.create_post = async (req, res) => {

    let { title, description, markdown } = req.body;

    // console.log(req.body)

    let image = '';
    if (req.body.image !== undefined) {
        image = req.body.image;
    }

    let tag = '';
    if (req.body.tag) {
        tag = req.body.tag;
    }

    if (req.body.paid) {
        try {
            let title = req.body.title;
            let description = req.body.description;
            let markdown = req.body.markdown;
            let amount = req.body.amount;
            let paid = req.body.paid;

            await paidBlog.create({ title, description, markdown, amount, paid });
            res.redirect("/blog/buy");
        } catch (error) {
            res.redirect("/blog")
            console.log(error)
        }
    }

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/logout');
            }

            try {
                let user = await User.findOne({ _id: decodedToken.id });
                let email = user.email;
                let name = user.name;
                await Blogs.create({ title, description, markdown, email, name, image, tag })
                res.redirect("/blog")
            } catch (error) {
                console.log(error.message)
            }
        })
    }
    else {
        res.redirect("/logout")
    }

}

module.exports.showblog_get = async (req, res) => {

    const _id = req.params.id;
    const blog = await Blogs.findOne({ _id })
    let context = {
        blog: blog
    }
    res.render("showBlog", context);
}

module.exports.editblog_get = async (req, res) => {
    const _id = req.params.id;
    try {
        let blog = await Blogs.findOne({ _id });
        let context = {
            blog: blog
        }
        res.render("editblog", context);
    } catch (error) {
        console.log(error)
        res.redirect("/blog")
    }
}

module.exports.editblog_put = async (req, res) => {
    const _id = req.params.id;
    let blog = await Blogs.findOne({ _id });
    await blog.updateOne({
        _id,
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        tag: req.body.tag
    });
    try {
        await blog.save();
        res.redirect("/blog");
    } catch (e) {
        console.log(e);
    }
}


module.exports.delete_get = async (req, res) => {
    const _id = req.params.id;
    await Blogs.deleteOne({ _id })
    res.redirect("/blog");
}



module.exports.comment_post = async (req, res) => {
    const { id, data, username } = req.body;
    try {

        var comment_id = new ObjectId();
        const Blog = await Blogs.findByIdAndUpdate({ _id: id }, {
            $push: {
                "comments": {
                    _id: comment_id,
                    name: username,
                    comment: data,
                    date: new Date
                }
            }
        })
        res.json("true");
    } catch (error) {
        console.log(error);
        res.json("false");
    }
}

module.exports.upload_image = async (req, res) => {
    try {

        let imagePath = '/images';
        imagePath = imagePath + '/' + req.file.filename;

        res.send({ success: true, msg: 'Post Image uploaded', path: imagePath });

    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }
}

module.exports.comment_reply = async (req, res) => {
    try {

        let reply_id = new ObjectId();
        await Blogs.updateOne({
            "_id": new ObjectId(req.body.blog_id),
            "comments._id": new ObjectId(req.body.comment_id)
        },
            {
                $push: {
                    "comments.$.replies": { _id: reply_id, name: req.body.username, reply: req.body.reply, date: new Date }
                }

            })


        res.json("true");

    } catch (error) {
        console.log(error);
        res.json("flase");
    }
}

