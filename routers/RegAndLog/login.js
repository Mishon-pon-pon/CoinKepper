const passport = require('../../libs/passport');

exports.post = passport.authenticate('local', {
    successRedirect: '/registration',
    failureRedirect: '/',
    failureFlash: false,
    successFlash: false
});