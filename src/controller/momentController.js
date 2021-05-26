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
    async update(ctx,next){
        const {momentId}=ctx.params
        const {content}=ctx.request.body
        const userId=ctx.user.id
        const result=await momentService.update(content,momentId)
        const Detail=await momentService.Detail(momentId)
        console.log(result);
        ctx.body={
            code:200,
            msg:'修改成功',
            data:Detail
        }
    }
    async del(ctx,next){
        const {momentId}=ctx.params
        await momentService.del(momentId)
        ctx.body={
            code:200,
            msg:'删除成功',
        }
    }
}
module.exports=new momentController()