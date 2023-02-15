const paidBlog = require("../models/paidBlog");

module.exports.buyblog_get = async (req, res) => {
    const paidblog = await paidBlog.find({});
    let context = {
        blogs: paidblog
    }
    res.render("buyblog", context)
}

module.exports.buyBlog_paid_get = async (req, res) => {
    const _id = req.params.id;
    const Blog = await paidBlog.findOne({ _id });
    let context = {
        blog: Blog
    }
    res.render("showpaidblog", context)
}

module.exports.editblogpaid_get = async (req, res) => {
    const _id = req.params.id;
    try {
        let blog = await paidBlog.findOne({ _id });
        let context = {
            blog: blog
        }
        res.render("editpaidblog", context);
    } catch (error) {
        console.log(error)
        res.redirect("/blog/paid/buy")
    }
}

module.exports.editblogpaid_put = async (req, res) => {
    const _id = req.params.id;
    let blog = await paidBlog.findOne({ _id });
    await paidBlog.updateOne({
        _id,
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        amount:req.body.amount,
    });
    try {
        await blog.save();
        res.redirect("/blog/paid/buy");
    } catch (e) {
        console.log(e);
    }
}

module.exports.deletePaid_get = async (req, res) => {
    const _id = req.params.id;
    await paidBlog.deleteOne({ _id })
    res.redirect("/blog/paid/buy");
}