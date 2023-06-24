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

  async list(ctx, next) {
    // 获取分页查询参数
    const { offset, size } = ctx.query
    // 从数据库中查询评论列表
    const result = await momentService.queryList(size, offset)

    // 返回数据
    ctx.body = {
      code: 0,
      data: result,
    }
  }

  async detail(ctx, next) {
    // 1.获取动态的id
    const { momentId } = ctx.params;
    console.log(momentId, 'mId');
    // 2. 根据id查询动态详情
    const result = await momentService.queryById(momentId);

    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new MomentController()