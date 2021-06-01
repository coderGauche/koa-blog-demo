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
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentcount,
				(SELECT COUNT(*) FROM moment_label cl WHERE cl.moment_id=m.id) labelcount
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
        JSON_OBJECT('id',u.id,'name',u.name) user,
				IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
        (SELECT IF (COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,
        'moment',c.moment_id,
        'createTime',c.createAt,
        'user',JSON_OBJECT('id',cu.id,'name',cu.name))
				
        ),NULL)FROM comment  c  LEFT JOIN user cu ON cu.id=c.user_id WHERE m.id=c.moment_id )comments
        FROM moment m 
        LEFT JOIN user u ON m.user_id=u.id 
				LEFT JOIN moment_label ml ON ml.moment_id=m.id
				LEFT JOIN label l ON l.id= ml.label_id
        WHERE m.id=?
        GROUP BY m.id
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
    async hasLabel(momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result[0] ? true: false;
      }
      async addLabel(momentId, labelId) {
        console.log(momentId);
        console.log(labelId);
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
      }
}


module.exports=new momentService()