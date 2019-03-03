const CreateTableUsers = require('../libs/sqlite3/table/createUsers');
const saveNewUser = require('../libs/sqlite3/table/saveNew/saveNewUser');

exports.get = async (ctx, next) => {
    await CreateTableUsers();
    ctx.body = ctx.render('registration.pug')
}

exports.post = async (ctx, next) => {
    await saveNewUser(ctx.request.body, () => {});
    ctx.body = 'ok';
    ctx.statusCode = 200;
}