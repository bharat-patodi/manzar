var passport = require("passport");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user, done) => {
    User.findById(id, (err, done) => {
        done(null, user)
    })   
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    }); 
    console.log(profile);
  }
));