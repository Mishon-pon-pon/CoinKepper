const log = require('koa-logger');

exports.init = app => {
    app.use(log());
}