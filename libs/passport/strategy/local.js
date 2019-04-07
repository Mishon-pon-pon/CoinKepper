const LocalStrategy = require('passport-local');
const db = require('../../sqlite3/createDB');
const crypto = require('../../crypto/cryptoPass')

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : false
},
    async function (email, password, done) {
        try {
            const user = await new Promise(resolve => {
                db.get(`select * from Users where email = ?`, [email], (err, user) => {
                    if (err) resolve(err);
                    resolve(user);
                });
            });
            if (!user) {
                return done(null, false);
            }
            const cryptoCurrentPass = await crypto(user.salt, password)
            const isValidPassword = (cryptoCurrentPass == user.password);
            if (!isValidPassword) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.error(err);
            done(err);
        }
    }
);