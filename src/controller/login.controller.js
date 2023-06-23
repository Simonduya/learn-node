const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')
const { UNAUTHORIZATION } = require('../config/error')
class LoginController {
  sign(ctx, next) {
    // 1. 获取用户信息
    const { id, name } = ctx.user
    console.log(ctx.user)
    // 2. 颁发令牌token
    try {
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: 'RS256'
      })
      console.log(token,'token');
      // 3. 返回用户信息
      ctx.body = { code: 0, data: { id, name, token } }

    } catch(e) {
      console.log(e);
    }
  }
  test(ctx, next) {
    ctx.body = '验证身份通过'
  }
}

module.exports = new LoginController()
