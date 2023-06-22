const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')
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
}

module.exports = new LoginController()
