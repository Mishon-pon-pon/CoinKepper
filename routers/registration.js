const CreateTableUsers = require('../libs/sqlite3/table/createUsers');

exports.get = async (ctx, next) => {
    await CreateTableUsers();
    ctx.body = ctx.render('registration.pug')
}