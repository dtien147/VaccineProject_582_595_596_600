var express = require ('express');
var router = express.Router();

router.get('/child', function (req, res)
{
  res.render('child.ect', {});
});

module.exports = router;
