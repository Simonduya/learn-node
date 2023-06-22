const app = require('../app')
const { NAME_IS_ALREADY_EXISTS, NAME_OR_PASSWOES_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWOED_IS_INCORRENT } = require('../config/error')
app.on('error', (error, ctx) => {
  let code = 0;
  let message = '';
  switch (error) {
    case NAME_OR_PASSWOES_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户名已被占用'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '登录的用户名不存在, 请检查用户名'
      break
    case PASSWOED_IS_INCORRENT:
      code = -1004
      message = '登录的密码错误'
      break
  }

  ctx.body = { code, message }
})
