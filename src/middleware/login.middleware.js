const { NAME_OR_PASSWOES_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWOED_IS_INCORRENT, UNAUTHORIZATION } = require('../config/error');
const { PUBLIC_KEY } = require('../config/screct')
const userService = require('../service/user.service');
const md5password = require('../utils/md5-password');
const jwt = require('jsonwebtoken')
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

const verifyAuth = async (ctx, next) => {
  // 1. 获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '');
  // 2. 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    // 2.1将获取到的token信息保存
    ctx.user = result
    // console.log(result, 'res');
    // ctx.body = `可以访问login/test接口`
    // 3. 执行下一个中间件
    await next()
  } catch (err) {
    console.log(err, '验证的err')
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
