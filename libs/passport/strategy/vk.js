const VKontakteStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
const saveNewUser = require('../../sqlite3/table/saveNew/saveNewUser');
const db = require('../../sqlite3/createDB');

module.exports = new VKontakteStrategy({
    clientID: config.get('auth.vk.clientID'), // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: config.get('auth.vk.clientSecret'),
    callbackURL: "http://localhost:" + config.get('server.port') + "/auth/vkontakte/callback"
},
    async function (accessToken, refreshToken, params, profile, done) {
        try {
            let User = {
                id: params.user_id,
                email: params.email,
                displayname: profile.displayName,
                password: accessToken,
                salt: ''
            }
            await new Promise(resolve => {
                db.serialize(() => {
                    db.get(`SELECT * FROM Users WHERE email = ?`, [User.email], (err, row) => {
                        resolve(row);
                    })
                })
            }).then(result => {
                if (result !== null) {
                    return done(null, User);
                }
            });

            saveNewUser(User, function () { 
                return done(null, User);
            });
        } catch (error) {
            console.log(error);
        }
    }
);