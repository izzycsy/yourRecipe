const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

//SERIALIZE obj to store, converting user to an id
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//DESERIALIZE obj by taking user's SERIALIZATION (id) and look up in database
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//PASSPORT STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) return done(err);

        // If no user is found // TODO. remove flash message for now
        if (!user) return done(null, false);

        // Check if the password is correct
        if (!user.validPassword(password)) return done(null, false);

        return done(null, user);
      });
    }
  )
);

// export the Passport configuration from this module
module.exports = passport;
