const confirmTable = require('./confirmtable');
const db = require('../createDB');

module.exports = async () => {
    if (!await confirmTable('Users')) {
        db.run(`Create table Users(
            id INTEGER PRIMARY KEY NOT NULL UNIQUE, 
            email TEXT NOT NULL UNIQUE, 
            confirmemail BOOLEAN NOT NULL,
            displayname TEXT,
            dateregistration DATE NOT NULL,
            password TEXT NOT NULL,
            salt TEXT NOT NULL,
            avatarpath TEXT)`, (err, row) => {});
    }
};