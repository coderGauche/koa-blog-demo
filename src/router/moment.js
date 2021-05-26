
const { verify } = require('jsonwebtoken')
const Router=require('koa-router')
const momentRouter=new Router({prefix:'/moment'})

const{
    create,
    momentDetail,
    momentList,
    update,
    del
}=require('../controller/momentController.js')

const {
    verifyAuth,
    verifypermission
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
/**
 * 接口说明：修改 需要用户登入
 */
 momentRouter.patch('/:momentId',verifyAuth,verifypermission,update)
 /**
 * 接口说明：删除 需要用户登入
 */
  momentRouter.delete('/:momentId',verifyAuth,verifypermission,del)

module.exports=momentRouter