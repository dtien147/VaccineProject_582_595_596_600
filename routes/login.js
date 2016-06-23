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


module.exports = router;
