const { NAME_OR_PASSWOES_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWOED_IS_INCORRENT } = require('../config/error');
const userService = require('../service/user.service');
const md5password = require('../utils/md5-password');
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 1. 判断用户名密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWOES_IS_REQUIRED, ctx);
  }
  // 2. 查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    console.log('登录用户名不存在')
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx);
  }
  // 3. 查询数据库中密码和用户传递密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit('error', PASSWOED_IS_INCORRENT, ctx);
  }
  // 4. 将user对象保存在ctx
  ctx.user = user
  // 5. 颁发令牌, 传入token
  await next()
}

module.exports = {
  verifyLogin
}
