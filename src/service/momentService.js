const connection=require('../app/database')

class momentService{
    async create(userId,content){
        const statement=`INSERT INTO moment (content,user_id) VALUES (?,?)`
        const [result]=await connection.execute(statement,[content,userId])
        return result
    }
    async List(offset,size){
        const statement=`
        SELECT 
        m.id id, 
        m.content content,
        m.updateAt updateTime,
        m.createAt createTime,
        JSON_OBJECT('id',u.id,'name',u.name) user
        FROM moment m LEFT JOIN user u ON m.user_id=u.id  LIMIT ?,?
        `
        const [result]=await connection.execute(statement,[offset,size])
        return result
    }
    async Detail(id){
        const statement=`
        SELECT 
        m.id id, 
        m.content content,
        m.updateAt updateTime,
        m.createAt createTime,
        JSON_OBJECT('id',u.id,'name',u.name) user
        FROM moment m LEFT JOIN user u ON m.user_id=u.id WHERE m.id=?
        `
        const [result]=await connection.execute(statement,[id])
        return result[0]
    }
    async update(content,id){
        console.log(content,id);
        const statement=`UPDATE moment SET content=? WHERE id=?`
        const [result]=await connection.execute(statement,[content,id])
        return result[0]
    }
    async del(id){
        console.log(id);
        const statement=`DELETE FROM moment  WHERE id=?`
        await connection.execute(statement,[id])
    }
}


module.exports=new momentService()