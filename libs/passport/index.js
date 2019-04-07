const passport = require('koa-passport');
const db = require('../sqlite3/createDB');

const localStrategy = require('./strategy/local');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    await new Promise(resolve => {
        db.get(`select * from Users where id = ?`, [id], (err, user) => {
            if (err) done(null, err);
            done(null, user);
            resolve();
        })
    });
});

passport.use(localStrategy);

module.exports = passport;