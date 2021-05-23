class authController{
    async login(ctx,next){
        const{name}=ctx.request.body
        ctx.body=`登陆成功欢迎${name}回来`

    }
}

module.exports = new authController;