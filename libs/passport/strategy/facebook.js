const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');

module.exports = new FacebookStrategy({
    clientID: config.get("auth.facebook.clientID"),
    clientSecret: config.get("auth.facebook.clientSecret"),
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    try {
        console.log("accessToken: ", accessToken);
        console.log("refreshToken: ", refreshToken);
        console.log("profile: ", profile);
    } catch (error) {
        console.log(error);
    }
  }
);