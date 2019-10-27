const sslify = require('koa-sslify').default;

exports.init = app => {
    return app.use(sslify());
}