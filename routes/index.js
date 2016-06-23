var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if(req.user == undefined) {
		res.redirect('/login');
	}
	else {
		res.redirect('/parent');
	}	
});

module.exports = router;
