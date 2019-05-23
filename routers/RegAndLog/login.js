const passport = require('../../libs/passport');

exports.post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false,
    successFlash: false
});