const database = require('../app/database')
const commentrouter = require('../router/commentRouter')

class commentserve {
    async create(mement_id, content, id) {
        console.log(mement_id, content, id);
        try {
            const statement = `INSERT INTO comment (content,moment_id,user_id,user_id) VALUES (?,?,?)`
            const [result] = await database.execute(statement, [content, mement_id, id])
            return result
        } catch (err) {
            console.log(err);
            const error = new Error(err);
            return ctx.app.emit('error', error, ctx);
        }
    }
    async replys(moment_id, content, user_id,commentId) {
        console.log(moment_id, content, user_id,commentId);
        try {
            const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?)`
            const [result] = await database.execute(statement, [content, moment_id, user_id,commentId])
            console.log(result);
            return result
        } catch (err) {
            console.log(err);
            const error = new Error(err);
            return ctx.app.emit('error', error, ctx);
        }
    }

}

module.exports = new commentserve()