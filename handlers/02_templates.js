const pug = require('pug');
const path = require('path');
const config = require('config');

exports.init = app => app.use(async (ctx, next) => {
    ctx.render = (filePath, local) => {
        filePath = path.join(config.get('templatePath'), filePath);
        return pug.renderFile(filePath, local);
    }
    await next();
})