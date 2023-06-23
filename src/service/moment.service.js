const conection = require('../app/database')

class MomentService {
  async create(content, userID) {
    const statement = 'INSERT INTO `moment` (content, user_id) VALUES (?, ?);';
    const [result] = await conection.execute(statement, [content, userID])
    return result
  }
}

module.exports = new MomentService()