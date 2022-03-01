const userRouter = require('express').Router({ caseSensitive: true });

const { userSignUpPostController, userSignUpGetController, userLoginPostController, userLoginGetController } = require('../controller/userController');


userRouter.get('/signup', userSignUpGetController);
userRouter.post('/signup', userSignUpPostController);

userRouter.get('/login', userLoginGetController);
userRouter.post('/login', userLoginPostController);


module.exports = userRouter;