var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index.ect', { title: 'home' });
  console.log(req.user);
});

module.exports = router;