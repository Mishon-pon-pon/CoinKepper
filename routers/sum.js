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
        if(result){
            ctx.statusCode = 200;
            ctx.body = result;
        }
    })
}