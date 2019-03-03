const sqlite3 = require('sqlite3');
const config = require('config');

module.exports = new sqlite3.Database(config.get('dataBase'));