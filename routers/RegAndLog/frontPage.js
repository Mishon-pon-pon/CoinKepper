const fs = require('fs');
const config = require('config')
const static = require('koa-static');
const serve = require('koa-static');

exports.get = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = ctx.htmlrender(config.get('public') + '/app.html');
    } else {
        // ctx.body = ctx.render('login.pug')
        ctx.type = 'html';
        ctx.body = ctx.htmlrender(config.get('public') + '/index.html');
    }
};