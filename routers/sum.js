const createSum = require('../libs/sqlite3/table/createSum');
const db = require('../libs/sqlite3/createDB');

exports.post = async (ctx, next) => {
    await new Promise(resolve => {
        db.serialize(() => {
            let createSum = db.prepare(`INSERT INTO Sum(Value, CategoryId, createDate) VALUES(?, ?, CURRENT_TIMESTAMP)`)
            createSum.run(ctx.request.body.Value, ctx.request.body.CategoryId);
            db.get(`SELECT * FROM Sum WHERE SumId=last_insert_rowid();`, (err, row) => {
                resolve(row);
            })
        })
    }).then(result => {
        if (result) {
            ctx.statusCode = 200;
            ctx.body = result;
        }
    })
};


exports.get = async ctx => {
    const sumCategory = [];
    await new Promise((resolve, reject) => {
        db.each(`SELECT SumId, Value, strftime('%d. %m. %Y', createDate) as createDate, CategoryId FROM Sum WHERE CategoryId = ${ctx.params.id}`, (err, row) => {
            sumCategory.push(row);

        }, () => {
            resolve(sumCategory);
        });
    }).then(sumCategory => {
        ctx.statusCode = 200;
        ctx.body = sumCategory;
    })

};

exports.delete = async ctx => {
    const SumId = ctx.params.id;
    await new Promise(resolve => {
        db.run(`DELETE FROM Sum WHERE SumId = ?`, SumId, () => {
            resolve();
        });
    })
    ctx.statusCode = 200;
    ctx.body = { SumId: ctx.params.id };
}