const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')


const app = new Koa();
app.use(cors());
app.use(bodyParser())
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app