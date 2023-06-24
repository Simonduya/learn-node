const fs = require('fs');

function registerRouters(app) {
  // 1. 读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname);
  // console.log(files);
  // 2. 遍历所有文件
  for (const file of files) {
    if (file.endsWith('.router.js')) {
      // console.log(file)
      const router = require(`./${file}`);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  }
}

module.exports = registerRouters;