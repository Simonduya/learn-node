const app = require('./app/index');
// const connection = require('./app/database');
const config = require('./app/config');
require('./utils/handle-error')

app.listen(config.APP_PORT, () => {
    console.log(`服务在${config.APP_PORT}端口启动~`);
})
