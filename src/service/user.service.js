const connection = require('../app/database');
class UserService {
  async create(user) {

    // 将user存储到数据库
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    try {
      const result = await connection.execute(statement, [name, password]);
      console.log("将用户数据成功存入数据库", user);
      return result;
    } catch (err) {
      console.log(err)
    }
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    try {
      const [values] = await connection.execute(statement, [name]);
      return values;
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = new UserService();
