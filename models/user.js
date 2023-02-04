const mongoose = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// creating mongoose schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  name: {
    type: String,
    required: [true , 'Please enter your name']
  },
  phone: {
    type:Number,
    requied: [true , "Enter your Number"],
    min:[1000000000, 'please enter a valid number'],
    max:[9999999999,'please enter a valid number']
  }
})

// encoding the password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model("User", userSchema);

module.exports = User;