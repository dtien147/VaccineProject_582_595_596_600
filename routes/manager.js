var express = require('express');
var router = express.Router();

router.get('/manager', function(req, res) {
    if (req.user === undefined || req.user['type'] !== 'Manager') {
        res.redirect('/');
    } else {
        var vaccines = req.db.get("vaccines");
        vaccines.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.render('manager.ect', {
                    vaccineList: result
                });
            }
        });
    }
});

router.post('/delete_vaccine', function(req, res) {
    if (req.user === undefined || req.user['type'] !== 'Manager') {
        var vaccines = req.db.get('vaccines');
        vaccines.remove({
            '_id': req.body.id
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result != null && result > 0) {
                console.log("Remove vaccine success");
                res.send(true);
            } else {
                console.log("remove vaccine failed");
                res.send(false);
            }
        });
    } else {
        res.send(false);
    }
});

router.post('/save_vaccine', function(req, res) {
    if (req.user === undefined || req.user['type'] !== 'Manager') {
        var vaccines = req.db.get('vaccines');
        var vaccine = req.body.vaccine;
        var ObjectID = require('mongodb').ObjectID;

        if (ObjectID.isValid(vaccine.id) === false) {
            vaccine.id = new ObjectID();
            console.log(vaccine.id);
        };

        vaccines.update({
            '_id': vaccine.id
        }, {
            'name': vaccine.name,
            'doses': vaccine.doses,
            'side_effects': vaccine.sideEffects
        }, {
            upsert: true
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result != null && result > 0) {
                console.log("Save vaccine success");
                res.send(vaccine.id);
            } else {
                console.log("Save vaccine failed");
                res.send(false);
            }
        });
    } else {
        res.send(false);
    }
});

module.exports = router;
