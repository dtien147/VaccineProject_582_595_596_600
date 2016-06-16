var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/login', function(req, res) {
	res.render('login.ect', {});
})

router.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/parent');
    console.log(req.user);
});

router.post('',  passport.authenticate('local', { failureRedirect: '' }),
  function(req, res) {
    res.redirect('/parent');
    console.log(req.user);
});



module.exports = router;