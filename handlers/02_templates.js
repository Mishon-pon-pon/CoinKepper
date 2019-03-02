const pug = require('pug');
const path = require('path');
const config = require('config');

exports.init = app => app.use(async (ctx, next) => {
    ctx.render = (templatePath, local) => {
        return pug.renderFile(path.join(config.get('templateFolder'), templatePath), local);
    }
    await next();
})