const users = require("../models/user");
const jwt = require("jsonwebtoken");


const handleErrors = (err) => {

    let errors = { email: '', password: '' , name: '', phone :'' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


const maxage = 3 * 24 * 60 * 60;
const createToken = (id) => {
    // takes age in sec
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxage })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password , name , phone } = req.body;

    try {
        const newUser = await users.create({ email, password , name , phone })
        const token = createToken(newUser._id);
        // takes age in milli sec
        res.cookie("jwt", token, { maxAge: maxage * 1000, httpOnly: true })
        res.json({ user: newUser._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await users.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxage * 1000 });
        res.json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.json({ errors });
    }
}

module.exports.logout_get = (req,res) => {
    res.cookie('jwt', "", {maxAge : 1, httpOnly:true});
    res.redirect('/');
}
