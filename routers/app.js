exports.get = (ctx, next) => {
    console.log(ctx.session)
    ctx.body = ctx.render('app.pug')
}