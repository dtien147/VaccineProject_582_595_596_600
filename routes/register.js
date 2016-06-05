var express = require('express');
var router = express.Router();

router.get('/register', function(req, res) {
	res.render('register.ect', {});
})


router.post('/register', function(req, res) {
	var db = req.db;
	var users = db.get('users');	
	users.findOne({ email: req.body.email }, function (err, result) {
		if (err) {
			console.log(err);
		} else if (result != null) {
			res.render('register.ect', { error: 'User exists' });
		} else {
			users.insert({ 'email': req.body.email, 
				'first_name': req.body.first_name, 'last_name': req.body.last_name, 
				'password': req.body.password });
		}
	});
});



module.exports = router;