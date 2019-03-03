const db = require('../createDB');

module.exports = (tableName) => {
    return new Promise(resolve => {
        db.get(`SELECT count(*) as result FROM sqlite_master WHERE type='table' AND name= ?`, [tableName], (err, row) => {
            resolve(row.result == 1 ? true : false);
        })
    });
}