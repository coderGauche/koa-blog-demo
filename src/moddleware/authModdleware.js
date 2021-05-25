const errorType=require('../constants/error-types')
const service =require('../service/userService');
const md5password = require('../utils/password-handle');
const jwt =require('jsonwebtoken')
const {PUBLIC_KEY}=require('../app/config')
const verifyLOgin = async (ctx, next) => {
    //获取用户名密码
    const {
        name,
        password
    } = ctx.request.body;

    
    // 判断用户名是否为空
    if (!name || !password) {
        // const error=new Error("用户名或者密码不能为空")
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx)
    }


    //判断有没有被注册过
    const result = await service.getUserByName(name);
    // 用户信息
    const user=result[0]
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }
    //判断密码是否正确加密
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT);
        return ctx.app.emit('error', error, ctx);
      }

    ctx.user=user
    await next()

}
const verifyAuth=async(ctx,next)=>{
    const authorization=ctx.header.authorization;
    // console.log(authorization);
    if(!authorization){
        const error = new Error(errorType.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx);
    }
    const token=authorization.replace('Bearer ','')
    try{
    //解析token
    const result=jwt.verify(token,PUBLIC_KEY,{
        algorithms:["RS256"]
    })
    ctx.user=result
    await next()

    }catch(err){
        const error = new Error(errorType.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx);
    }
}
module.exports = { 
    verifyLOgin,
    verifyAuth
}