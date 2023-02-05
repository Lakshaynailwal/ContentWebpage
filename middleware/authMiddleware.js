const jwt = require('jsonwebtoken')
const user = require("../models/user")

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        //   console.log(err.message);
        res.redirect('/login');
      } else {
        //   console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkadmin = (req,res,next)=>{

  const adminEmail = process.env.ADMIN;
  const token = req.cookies.jwt;
  res.locals.admin = null;
  if(token){
    jwt.verify(token,process.env.SECRET,async(err,decodedToken)=>{
      if(err){
        res.locals.admin = null;
      }
      else{
        let User = await user.findOne({_id: decodedToken.id});
        if(User.email == adminEmail){
          res.locals.admin = User;
        }
        next()
      }
    })
  }
  else{
    res.locals.admin = null;
    next();
  }

};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token , process.env.SECRET, async(err,decodedToken)=>{
      // console.log(decodedToken,"token");
      if(err){
        res.locals.user = null;
        next()
      }
      else{
        let User = await user.findOne({ _id : decodedToken.id});
        if(User){
          res.locals.user = User;
        }
        next();
      }
    });
  }
  else{
    res.locals.user = null;
    next();
  }

};

module.exports = { checkAuth, checkadmin,checkUser };