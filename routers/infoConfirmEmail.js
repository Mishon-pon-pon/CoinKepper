exports.get = async (ctx, next) => {
    ctx.body = ctx.render('infoConfirmEmail.pug');
}