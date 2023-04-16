## day01
### 用户注册接口实现
1. app入口文件 app/main.js
2. 引入Koa, Koa-router app/index.js
    * 创建对应实例
    * 配置路由
    * 给出对应响应
4. 配置.env文件 app/config.js
    * 安装dotenv

## day02
1. 将app/index 中的逻辑进一步拆分
    * 将用户注册接口的路由放入router中
    * 接口的处理逻辑放入service/user.service.js中
    * 数据库操作放入controller/user.controller.js中
2. 在router中获取用户输入
    * npm install koa-bodyparser（用于解析请求体中的JSON数据的中间件）
    * 使用中间件koa-bodyparser

### 使用koa写一个用户注册的接口, 给出示例代码和注释

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// 注册中间件
app.use(bodyParser());  // 解析 request body 中的 JSON 数据

// 用户注册接口
router.post('/api/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;  // 从 request body 中获取用户名和密码
  // 在这里进行用户注册的逻辑处理，比如将用户信息存入数据库中
  // 这里只是简单地将用户名和密码返回给客户端作为示例
  ctx.body = {
    message: '用户注册成功',
    data: {
      username,
      password
    }
  };
});

// 将路由挂载到应用上
app.use(router.routes()).use(router.allowedMethods());

// 启动应用
app.listen(3000, () => {
  console.log('应用已启动，监听端口 3000');
});
```
代码中使用了 koa-bodyparser 中间件来解析 request body 中的 JSON 数据，这样就可以方便地从中获取到客户端传递过来的用户名和密码等信息。在注册接口的处理函数中，我们可以在这里进行用户注册的逻辑处理，比如将用户信息存入数据库中。为了简单起见，这里只是将用户名和密码返回给客户端作为示例。最后，将路由挂载到应用上并启动应用，就可以在监听的端口上提供用户注册接口的服务了。

### 刚刚的代码中ctx.request.body获取到的是空对象, 可能的原因有哪些
当使用 ctx.request.body 获取 request body 时，返回的结果是一个空对象 {}，可能的原因包括：

没有使用 body-parser 中间件或没有正确地配置该中间件。Koa 框架默认不包含 body-parser 中间件，因此需要手动安装和配置。可以通过执行 npm install koa-bodyparser 来安装该中间件，然后在代码中添加 app.use(bodyParser()); 来使用该中间件。

请求的 Content-Type 不是 application/json。如果请求的 Content-Type 是 application/x-www-form-urlencoded 或 multipart/form-data 等其他类型，需要使用相应的中间件来解析 request body，例如 koa-body、koa-multer 等。

请求体中没有正确的 JSON 数据。如果请求体中没有正确的 JSON 数据，解析后得到的对象可能是空对象 {}。需要确保请求体中包含正确的 JSON 数据，例如 { "username": "myusername", "password": "mypassword" }。

请求体过大或被截断。如果请求体过大，可能会被截断，导致解析后的对象为空对象 {}。需要确保请求体的大小不超过服务器配置的限制。

请求没有正确发送。如果请求没有正确发送，可能会导致解析后的对象为空对象 {}。需要确保请求已经正确发送，并且服务器能够正确地接收到请求

eg：果然啊，发送网络请求的时候忘记选择JSON格式了。。。