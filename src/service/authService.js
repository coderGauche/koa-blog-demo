const database=require('../app/database')
class authService{
    async checkmomentservice(momentId,id){
        try{
            console.log(momentId,id);
            const statement=`SELECT *FROM moment WHERE id=? AND user_id=?`
            const [result]=await database.execute(statement,[momentId,id])
            console.log(result);
            return result.length===0?false:true
        }catch(err){
            console.log(err); 
        }
       
    }
}
module.exports=new authService()