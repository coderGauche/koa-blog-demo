
const Router=require('koa-router')
const momentRouter=new Router({prefix:'/moment'})

const{
    create,
    momentDetail,
    momentList
}=require('../controller/momentController.js')

const {
    verifyAuth
}=require('../moddleware/authModdleware')
/**
 * 接口说明：发表动态
 */
momentRouter.post('/',verifyAuth,create)
/**
 * 接口说明：获取动态接口(某一条) 不需要用户登入
 */
momentRouter.get('/:momentId',momentDetail)
/**
 * 接口说明：获取多条 不需要用户登入
 */
momentRouter.get('/',momentList)

module.exports=momentRouter