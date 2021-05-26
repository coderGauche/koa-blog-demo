const commentserver=require('../service/commentserver')
class commentController{
    async create(ctx,next){
        const {moment_id,content}=ctx.request.body
        const user_id=ctx.user.id
        const result=await commentserver.create(moment_id,content,user_id)
        console.log(result);
        ctx.body={
            code:200,
            msg:'评论成功'
        }
    }
    async reply(ctx,next){
        const {moment_id,content}=ctx.request.body
        const {commentId}=ctx.params
        const user_id=ctx.user.id
        const result=await commentserver.replys(moment_id,content,user_id,commentId)
        ctx.body={
            code:200,
            msg:'回复成功'
        }
    }
}
module.exports=new commentController()