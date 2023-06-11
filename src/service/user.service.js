const connection = require('../app/database');
class UserService {
    async create(user) {

        // console.log("将用户数据存入数据库", user);
        // 将user存储到数据库
        const { name, password } = user;
        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
        const result = await connection.execute(statement, [name, password]);

        return result;
    }
}

module.exports = new UserService();