const pug = require('pug');
const path = require('path');
const config = require('config');
const fs = require('fs');

exports.init = app => app.use(async (ctx, next) => {
    ctx.render = (templatePath, local) => {
        return pug.renderFile(path.join(config.get('templateFolder'), templatePath), local);
    }
    ctx.htmlrender = (htmlPath) => {
        return fs.createReadStream(htmlPath);
    }
    await next();
})