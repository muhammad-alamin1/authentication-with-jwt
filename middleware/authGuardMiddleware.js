const jwt = require("jsonwebtoken");

const authGuardMiddleware = async(req, res, next) => {
    const { access_token } = req.headers;

    try {
        const token = access_token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jWT_SCERET);

        if (decoded) {
            res.redirect('/');
        } else {
            res.render('login', {
                title: 'Login',
            });
        }

        const { username, userId } = decoded;

        req.username = username;
        req.userId = userId;

        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = authGuardMiddleware;