const labelserve=require('../service/lableService')
class lableController{
   async create(ctx,next){
         const{name}=ctx.request.body
         const result=labelserve.create(name)
         ctx.body={
             code:200,
             msg:'εε»Ίζε',
         }
   }
    async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await labelserve.getLabels(limit, offset);
    ctx.body = result;
  }
}
module.exports=new lableController()