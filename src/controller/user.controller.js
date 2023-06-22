const service = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');        
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
            },
            res
        }
    }
}

module.exports = new UserController();