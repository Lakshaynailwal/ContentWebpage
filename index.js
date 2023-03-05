require("dotenv").config({ path: "./config.env" }); // getting secret files

const express = require("express");
const port = 5000;
const navRoutes = require("./routes/navroutes");
const AuthRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const paidBlogRoutes = require("./routes/paidBlogRoutes");
const app = express();  // instance of app
const connectDB = require("./config/connectDB");
const cookieparser = require("cookie-parser");
const { checkUser, checkAuth, checkadmin } = require("./middleware/authMiddleware")
const methodOverride = require("method-override");

const faqs = require("./models/faqs")



// connecting database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Succesfully running at PORT : ${port}`);
    })
})

// getting json data
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(methodOverride("_method"));

// setting view-engine
app.set("view engine", "ejs");
app.set("views", "templates");

//routes
app.get('*', checkUser, checkadmin);
app.get('/', async(req, res) =>{

    // const faqdata = await faqs.find({})
    // let context = {
    //     faq:faqdata
    // }
    res.render('index')
});

app.use(AuthRoutes);
app.use(navRoutes);
app.use("/blog", blogRoutes);
app.use("/blog/paid", checkadmin, paidBlogRoutes);