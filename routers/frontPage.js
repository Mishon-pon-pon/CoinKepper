exports.get = async (ctx, next) => {
    const x = ctx.isAuthenticated();
    if (ctx.isAuthenticated()) {
        ctx.body = ctx.render('app.pug')
    } else {
        ctx.body = ctx.render('login.pug')
    }
};