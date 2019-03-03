const favicon = require('koa-favicon');
const config = require('config');

exports.init = app => app.use(favicon(config.get('public') + '/favicon.ico'));