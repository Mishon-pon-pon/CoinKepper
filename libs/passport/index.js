const passport = require('koa-passport');
const db = require('../sqlite3/createDB');

const localStrategy = require('./strategy/local');
const facebookStrategy = require('./strategy/facebook');
const VKontakteStrategy = require('./strategy/vk');

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
    await new Promise(resolve => {
        db.get(`select * from Users where email = ?`, [email], (err, user) => {
            if (err) done(null, err);
            done(null, user);
            resolve();
        })
    });
});

passport.use(localStrategy);
// passport.use(facebookStrategy);
passport.use(VKontakteStrategy);

module.exports = passport;