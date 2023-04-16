const service = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        // 获取用户传递的参数
        let req = ctx.request.body;
        console.log(req);
        // 查询数据库
        const res = await service.create(req);
          // 返回结果
        ctx.body = {
            message:'请求成功',
            data: {
                ...req
            }
        }
    }
}

module.exports = new UserController();