const router=require('koa-router')
const {
    create
} =require('../controller/userController')
const {
    verifyUser,
    handlePassword
}=require('../moddleware/userModdleware')
const userRouter=new router({prefix:'/users'})
userRouter.post('/',verifyUser,handlePassword,create)   //verifyUser验证  中间件

module.exports=userRouter