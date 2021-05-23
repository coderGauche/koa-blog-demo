const service=require('../service/userService')
class userController{
    async create(ctx,next){
      //获取用户请求参数
      const user=ctx.request.body
      console.log(user);
      //查询数据
      const result=await service.create(user)
      //返回数据
      ctx.body=result
    }
}

module.exports=new userController()