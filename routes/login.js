var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/login', function(req, res) {
	res.render('login.ect', {});
})

router.get('', function(req, res) {
	res.render('login.ect', {});
})

router.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
	 var user = req.user;
    res.redirect('/parent/' + user.email);
    
});

router.post('',  passport.authenticate('local', { failureRedirect: '' }),
  function(req, res) {
	  var db = req.db;
	var users = db.get('users');
	users.findOne({email: req.body.email, password: req.body.password}, function (err, result) {
		if (err) {
			console.log(err);
		} else if (result != null) {
			res.redirect('/parent/' + result['email']);
		
		}
	});
   
});



module.exports = router;