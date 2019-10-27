const passport = require('../../libs/passport');

exports.post = passport.authenticate('vkontakte', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false,
    successFlash: false,
    scope: ['status', 'email', 'friends', 'notify']
});