require("dotenv").config({ path: "./config/config.env" }); // getting secret files

const express = require("express");
const port = process.env.PORT||5000;
const navRoutes = require("./routes/navroutes");
const AuthRoutes = require("./routes/authRoutes");
const app = express();  // instance of app
const connectDB = require("./config/connectDB");
const cookieparser = require("cookie-parser");
const {checkUser , checkAuth } = require("./middleware/authMiddleware")

// connecting database
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Succesfully running at PORT : ${port}`);
    })
})

// getting json data
app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieparser());

// setting view-engine
app.set("view engine", "ejs");
app.set("views", "templates");

//routes
app.get('*' , checkUser);
app.get('/', (req, res) => res.render('index'));

app.use(AuthRoutes);
app.use(navRoutes);