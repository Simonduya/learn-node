const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.APP_PORT);

module.exports = {
    APP_PORT
} = process.env