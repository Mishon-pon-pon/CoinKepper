const session = require('koa-session');
const sqliteStore = require('koa-sqlite3-session');

exports.init = app => {
    app.keys = ['keys', 'keykeys'];
    return app.use(session({
        store: new sqliteStore('db.db', {})
    }, app))
}