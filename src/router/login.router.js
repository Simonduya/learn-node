const Router = require('koa-router');
const { sign, test } = require('../controller/login.controller');
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware');
// 1.创建路由对象
const loginRouter = new Router({ prefix: '/login' });
// 2.定义路由中映射
loginRouter.post('/', verifyLogin, sign)
// 3. 测试token接口
loginRouter.get('/test', verifyAuth, test);
// 3.导出路由
module.exports = loginRouter;
