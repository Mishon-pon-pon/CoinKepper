const db = require('../libs/sqlite3/createDB');
const createCategories = require('../libs/sqlite3/table/createCategories');
const createSum = require('../libs/sqlite3/table/createSum');

exports.post = async (ctx, next) => {
    // создаем таблицу если ее нет
    await createCategories();
    await createSum();
    //
    await new Promise(resolve => {
        db.serialize(() => {
            let newCat = db.prepare(`INSERT INTO Categories(Name, AccountId, createDate) VALUES(?, ?, CURRENT_TIMESTAMP)`);
            newCat.run(ctx.request.body.Name, ctx.session.passport.user);
            newCat.finalize((err) => { });
            db.get(`SELECT CategoryId FROM Categories WHERE CategoryId=last_insert_rowid();`, (err, row) => {
                row.Name = ctx.request.body.categoryName;
                resolve(row);
            })
        })
    }).then(result => {
        if (result) {
            ctx.statusCode = 200;
            ctx.body = result;
        }
    });
}

exports.get = async (ctx, next) => {
    let categories = [];
    await new Promise(resolve => {
        db.each(`Select 
                    case 
                        when sum(s.Value) is null 
                        then 0 else sum(s.Value) 
                    end as Value, 
                    cat.CategoryId, 
                    cat.Name   
                    from Categories as cat
                left join Sum as s ON s.CategoryId = cat.CategoryId
                where AccountId = ?
                GROUP BY cat.CategoryId;`, [ctx.session.passport.user], (err, row) => {
                categories.push(row);
            }, () => {
                ctx.body = categories;
                resolve();
            });
    });
}

exports.delete = async (ctx, next) => {
    await new Promise(resolve => {
        db.serialize(() => {
            let DeleteCategory = db.prepare(`DELETE FROM Categories WHERE CategoryId = ?`)
            DeleteCategory.run(ctx.params.id)
            DeleteCategory.finalize();
            let DeleteSum = db.prepare(`DELETE FROM Sum WHERE CategoryId = ?`);
            DeleteSum.run(ctx.params.id)
            DeleteSum.finalize(() => {
                resolve(ctx.params.id);
            });
        })
    }).then(result => {
        ctx.statusCode = 200;
        ctx.body = result;
    })
}