exports.get = (ctx, next) => {
    ctx.body = ctx.render('registration.pug')
}