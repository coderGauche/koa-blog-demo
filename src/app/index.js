const koa=require('koa')
const bodyparser=require('koa-bodyparser')
const errhandle=require('./errorHandle')
const useRoutes = require('../router/userRouter');
const authRouter = require('../router/authRouter'); 

const app=new koa()
app.use(bodyparser())
app.use(useRoutes.routes()) //注册router
app.use(useRoutes.allowedMethods());  //判断请求方式有没有  会自动判断
app.use(authRouter.routes()) //注册router
app.use(authRouter.allowedMethods());  //判断请求方式有没有  会自动判断
app.on('error',errhandle)
module.exports=app