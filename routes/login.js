var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/login', function(req, res) {
	res.render('login.ect', {});
})

router.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});



module.exports = router;