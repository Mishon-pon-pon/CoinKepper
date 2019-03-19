const db = require('../libs/sqlite3/createDB');

exports.get = async (ctx, next) => {
    let id = ctx.params.id.slice(1);
    let user = await new Promise(resolve => {
        db.get(`SELECT * FROM Users WHERE salt = ?`, [id], (err, row) => {
            resolve(row);
        })
    });
    
    if (user.confirmemail === 0) {
        db.run(`UPDATE Users SET confirmemail = 1 WHERE salt = ?`, [id]);
        ctx.body = 'Ваш email подтвержден';
    } else {
        ctx.body = 'Приветсвуем!';
    }
}