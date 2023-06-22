const userService = require('../service/user.service');
const md5password = require('../utils/md5-password');

const verifyUser = async (ctx, next) => {
  // 验证前端数据是否为空
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    // ctx.body = {
    //   code: -1001,
    //   message: '用户名或者密码不能为空'
    // }
    return ctx.app.emit('error', 'name_or_password_is_required', ctx);
  }

  // 验证用户名是否重复
  try {
    const users = await userService.findUserByName(name)
    if (users.length) {
      return ctx.app.emit('error', 'name_is_already_exists', ctx);
    }
  } catch (err) {
    console.log(err);
  }

  // 执行下一个中间件
  await next();
}

const handlePassword = async (ctx, next) => {
  // 1. 取出密码
  const { password } = ctx.request.body;
  // 2. 对密码进行加密
  ctx.request.body.password = md5password(password);
  await next();
}
module.exports = {
  verifyUser,
  handlePassword
}
