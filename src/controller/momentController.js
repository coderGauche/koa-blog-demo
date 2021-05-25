const momentService=require('../service/momentService')
class momentController{
   async create(ctx,next){
      //获取用户id  动态内容
      const userId=ctx.user.id
      const {content}=ctx.request.body
      const result=await momentService.create(userId,content)
      console.log(result);
      ctx.body=result
    }
    async momentDetail(ctx,next){
        const momentId=ctx.params.momentId;
        const result=await momentService.Detail(momentId)
        console.log(result);
        ctx.body=result
    }
    async momentList(ctx,next){
        const {offset,size}=ctx.query
        const result=await momentService.List(offset,size)
        console.log(result);
        ctx.body=result
    }
}
module.exports=new momentController()