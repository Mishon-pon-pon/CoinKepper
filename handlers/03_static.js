const static = require('koa-static');
const config = require('config');

exports.init = app => app.use(static(config.get('public')));