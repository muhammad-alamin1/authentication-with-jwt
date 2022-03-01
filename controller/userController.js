const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup get
const userSignUpGetController = (req, res) => {
    res.render('signup', {
        title: 'Signup',
    })
}

// signup post
const userSignUpPostController = async(req, res, next) => {
    try {
        // hashedPassword
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPass
        })

        await newUser.save();
        res.render('login', {
            title: 'Login',
        })
    } catch (error) {
        next(error);
    }
}

// login get 
const userLoginGetController = (req, res) => {
    res.render('login', {
        title: 'Login',
    })
}

// login post 
const userLoginPostController = async(req, res, next) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPass = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPass) {
                // generate token and
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.jWT_SCERET, {
                    expiresIn: '2h'
                });

                res.cookie('access_token', token);
                res.redirect('/');
            } else {
                res.status(401).json({
                    error: 'Authentication failed.!',
                })
            }
        } else {
            res.status(401).json({
                error: 'Authentication failed.!',
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    userSignUpGetController,
    userSignUpPostController,
    userLoginGetController,
    userLoginPostController
}