const Rouer=require('koa-router')
const commentrouter=new Rouer({prefix:'/comment'})
const{
    verifyAuth,
    verifypermission
}=require('../moddleware/authModdleware')
const{
    create,
    reply
}=require('../controller/commentController')
commentrouter.post('/',verifyAuth,create)
commentrouter.post('/:commentId/reply',verifyAuth,reply)
module.exports=commentrouter