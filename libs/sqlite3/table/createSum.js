const confirmTable = require('./confirmtable');
const db = require('../createDB');

module.exports = async () => {
    if (!await confirmTable('Sum')) {
        db.run(`Create table Sum(
            SumId INTEGER PRIMARY KEY NOT NULL UNIQUE, 
            Value INTEGER NOT NULL UNIQUE,
            createDate DATE NOT NULL,
            CategoryId INTEGER NOT NULL)`, (err, row) => {});
    }
};