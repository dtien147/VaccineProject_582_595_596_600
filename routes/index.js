var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.user === null || req.user === undefined) {
        res.redirect('/login');
    } else {
        console.log(req.user['type']);
        if (req.user['type'] === 'Parent') {
            res.redirect('/parent');
        } else {
            res.redirect('/manager');
        }
    }
});

module.exports = router;
