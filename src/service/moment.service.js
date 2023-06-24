const conection = require('../app/database')

class MomentService {
  async create(content, userID) {
    const statement = 'INSERT INTO `moment` (content, user_id) VALUES (?, ?);';
    const [result] = await conection.execute(statement, [content, userID])
    return result
  }

  async queryList(size = 100, offset = 0) {
    try {
      console.log(size, offset)
      const statement =
      `SELECT
        m.id AS id,
        m.content AS content,
        m.createAt AS createTime,
        m.updateAt AS updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? OFFSET ?;
      `;
      const result = await conection.execute(statement, [String(size), String(offset)]);
      return result
    } catch (e) { console.log(e); }
  }

  async queryById(id) {
    console.log(id, 'idid')
    try {
      const statement =
      `SELECT
        m.id AS id,
        m.content AS content,
        m.createAt AS createTime,
        m.updateAt AS updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) AS user
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      WHERE m.id = ?;
      `;
      const [result] = await conection.execute(statement, [id]);
      return result
    } catch (e) { console.log(e); }
  }
}

module.exports = new MomentService()