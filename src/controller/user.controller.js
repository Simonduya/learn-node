const userService = require('../service/user.service');
const service = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 设置允许跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // 获取前端传递的参数
    let req = ctx.request.body;
    // console.log(req);



    // 将数据插入数据库
    const res = await service.create(req);
    // 返回结果给前端
    ctx.body = {
      message: '请求成功',
      data: {
        ...req
      },
      res
    }
  }
}

module.exports = new UserController();
