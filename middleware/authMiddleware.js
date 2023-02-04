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

module.exports = { checkAuth, checkUser };