const db = require('../../libs/sqlite3/createDB');
const createCategories = require('../../libs/sqlite3/table/createCategories');
const createSum = require('../../libs/sqlite3/table/createSum');

exports.post = async (ctx, next) => {
    // создаем таблицу если ее нет
    await createCategories();
    await createSum();
    //
    await new Promise(resolve => {
        db.serialize(() => {
            let newCat = db.prepare(`INSERT INTO Categories(Name, AccountId, createDate) VALUES(?, ?, CURRENT_TIMESTAMP)`);
            newCat.run(ctx.request.body.categoryName, ctx.session.passport.user);
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

exports.get = async (ctx, next) => {
    let categories = [];
    await new Promise(resolve => {
        db.each(`Select sum(s.Value) as Value, cat.CategoryId, cat.Name   from Categories as cat
        join Sum as s ON s.CategoryId = cat.CategoryId
        where AccountId = ?
		GROUP BY cat.CategoryId`, [ctx.session.passport.user], (err, row) => {
            categories.push(row);
        }, () => {
            ctx.body = categories;
            resolve();
        });
    });
}