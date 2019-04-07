const db = require('../../libs/sqlite3/createDB');
const createCategories = require('../../libs/sqlite3/table/createCategories');

exports.post = async (ctx, next) => {
    // создаем таблицу если ее нет
    await createCategories();
    //
    await new Promise(resolve => {
        db.serialize(() => {
            let newCat = db.prepare(`INSERT INTO Categories(Name, AccountId, createDate) VALUES(?, ?, ?)`);
            newCat.run(ctx.request.body.categoryName, ctx.session.passport.user, new Date());
            newCat.finalize((err) => {
                if (!err) {
                   resolve(true)
                }
            });
        })
    }).then(result => {
        if (result) {
            ctx.statusCode = 200;
            ctx.body = 'Ok'
        }
    })

}