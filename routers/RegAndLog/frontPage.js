const fs = require('fs');
const config = require('config')

exports.get = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html'
        ctx.body = ctx.htmlrender(config.get('public') + '/app.html');
    } else {
        ctx.body = ctx.render('login.pug')
    }
};