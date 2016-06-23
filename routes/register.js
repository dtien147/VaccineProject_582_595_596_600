var express = require('express');
var router = express.Router();

router.get('/register', function(req, res) {
    res.render('register.ect', {});
});

router.post('/register', function(req, res) {
    var db = req.db;
    var users = db.get('users');
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(req.body.email)) {
        users.findOne({
            email: req.body.email
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result != null) {
                res.send(false);
                console.log("User exists");
            } else if (req.body.name != '' && req.body.password != '') {
                users.insert({
                    'email': req.body.email,
                    'name': req.body.name,
                    'password': req.body.password
                });
                res.send('/');
                console.log("Success");
            } else {
                res.send(false);
                console.log("Name or password is empty");
            }
        });
    } else {
        res.send(false);
        console.log("Email is incorrect");
    }
});

module.exports = router;
