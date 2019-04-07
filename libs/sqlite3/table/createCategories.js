const confirmTable = require('./confirmtable');
const db = require('../createDB');

module.exports = async () => {
    if (!await confirmTable('Categories')) {
        await new Promise(resolve => {
            db.run(`Create table Categories(
            CategoryId INTEGER PRIMARY KEY NOT NULL UNIQUE, 
            Name TEXT NOT NULL UNIQUE,
            createDate DATE NOT NULL,
            AccountId INTEGER NOT NULL)`, (err, row) => { resolve() });
        });
    }
};