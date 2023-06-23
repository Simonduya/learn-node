const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1. 获取动态的内容
    const { content } = ctx.request.body
    // 2. 动态由谁发布
    const { id } = ctx.user;

    // 3. 将动态的相关数据保存到数据库
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message: '发表评论成功',
      data: result
    }
  }
}

module.exports = new MomentController()