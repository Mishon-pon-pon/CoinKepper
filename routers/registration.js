const CreateTableUsers = require('../libs/sqlite3/table/createUsers');
const saveNewUser = require('../libs/sqlite3/table/saveNew/saveNewUser');
const cryptoPass = require('../libs/crypto/cryptoPass');
const db = require('../libs/sqlite3/createDB');
const crypto = require('crypto');
const config = require('config');

exports.get = async (ctx, next) => {
    await CreateTableUsers();
    ctx.body = ctx.render('registration.pug')
}

exports.post = async (ctx, next) => {
    ///// test /////
    await new Promise(resolve => {
        db.run(`DELETE FROM Users`, (err, row) => {
            resolve();
        })
    });
    /////////////////

    ctx.request.body.salt = crypto.randomBytes(config.get('crypto.iterations')).toString('hex');
    ctx.request.body.password = await cryptoPass(ctx.request.body.salt, ctx.request.body.password);
    await saveNewUser(ctx.request.body, () => {});
    ctx.body = 'ok';
    ctx.statusCode = 200;
}