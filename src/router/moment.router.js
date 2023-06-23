const Router = require('koa-router');
const { verifyAuth } = require('../middleware/login.middleware');
const { create } = require('../controller/moment.controller');
// 1.创建路由对象
const momentRouter = new Router({ prefix: '/moment' });

// 2.定义路由中映射
// 2.1 用户注册接口
momentRouter.post('/', verifyAuth, create)

// 3.导出路由
module.exports = momentRouter;
