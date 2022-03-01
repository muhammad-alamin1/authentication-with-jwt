const rootRouter = require('express').Router({ caseSensitive: true });

const { rootGetController } = require('../controller/rootController');
const authGuardMiddleware = require('../middleware/authGuardMiddleware');


rootRouter.get('/', rootGetController); //


module.exports = rootRouter;