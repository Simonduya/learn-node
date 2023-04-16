class UserService {
    async create(user) {

        console.log("将用户数据存入数据库", user);
        // 将user存储到数据库

        return "创建用户成功";
    }
}

module.exports = new UserService();