var express = require("express");
var router = express.Router();
var passport = require("passport");


router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/users/login' }),
  function(req, res) {
    res.redirect('/');
});


module.exports = router;