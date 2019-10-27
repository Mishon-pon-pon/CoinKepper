const passport = require('../../libs/passport');

exports.post = passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false,
    successFlash: false
});