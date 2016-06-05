var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index.ect', { title: 'home' });
});

router.get('/register', function(req, res) {
	res.render('register.ect', {});
})

module.exports = router;