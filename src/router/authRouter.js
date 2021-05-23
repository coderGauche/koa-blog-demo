const Router = require('koa-router');

const authRouter = new Router();
const {
    login
}=require('../controller/authController')
const {
    verifyLOgin
}=require('../moddleware/authModdleware')

authRouter.post('/login',verifyLOgin,login)

module.exports = authRouter;