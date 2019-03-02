const Koa = require('koa');

const app = new Koa();

require('./handlers/01_errorHandler').init(app);

module.exports = app;