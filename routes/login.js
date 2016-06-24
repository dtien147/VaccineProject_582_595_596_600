var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res) {
    if (req.user === undefined) {
        res.render('login.ect', {});
    } else {
        res.redirect('/');
    }
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/parent',
    failureRedirect: '/login'
}));

router.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: ['email']}
));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log("Login facebook thanh cong")
      res.redirect('/');
    });
module.exports = router;
