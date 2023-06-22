const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const loginRouter = require('../router/login.router')

// 创建app
const app = new Koa();
// 对app使用中间件
app.use(cors());
app.use(bodyParser())
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

module.exports = app
