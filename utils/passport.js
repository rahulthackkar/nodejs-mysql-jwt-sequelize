const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require("../models");
const User = db.users;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      //   passReqToCallback: true,
      scope: ["profile", "email", "photos"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOrCreate({
        where: {
          googleId: profile.id,
          name: profile.displayName,
          username: profile.emails[0].value,
          email: profile.emails[0].value,
          source: "google",
        },
      });
      cb(null, profile);
    }
  )
);
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://nodejs-upskill.herokuapp.com/auth/facebook/callback",
  }, function (accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return cb(null, profile);
  }
));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
