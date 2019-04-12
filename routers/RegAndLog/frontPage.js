const fs = require('fs');

exports.get = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html'
        ctx.body = ctx.htmlrender('./client/app.html');
    } else {
        ctx.body = ctx.render('login.pug')
    }
};