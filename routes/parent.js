var express = require('express');
var router = express.Router();

router.get('/parent', function(req, res) {
    if (req.user === undefined) {
        res.redirect('/login');
    } else {
        var db = req.db;
        var users = db.get("users");
        var illness = db.get("illness");
        var email = req.params.parentEmail;
        users.findOne({'email': req.user['email']}, function (err1, result)
        {
          if (err1)
          {
            console.console.log(err1);
          }

          else if (result!==null)
          {
                var children = db.get("children");
                children.find({'parent-email': req.user['email']}, function(err, childrenList)
                 {
                    if (err)
                    {
                        console.log(err);
                    }
                     else if (childrenList !== null)
                    {
                        illness.find({}, function(err2, illnessList)
                        {
                          if (illnessList!==null)
                          {
                            console.log(illnessList);
                            res.render("parent.ect", {
                                illnessList: illnessList,
                                children: childrenList
                            });
                          }
                        });
                      }
                      else
                          {
                            res.render("parent.ect", {
                                children: childrenList
                            });
                          }
                      });
                    }
                     else {
                        res.render("parent.ect", {});
                    }
                });
            }
});

router.post('/parent/add_child', function(req, res) {
    if (req.user === undefined) {
        res.redirect('/login');
    } else {
        var db = req.db;
        var children = db.get('children');
        var email = req.params.parentEmail;
        children.insert({
            'parent-email': req.user['email'],
            'child_name': req.body.child_name,
            'birthday': req.body.datepicker,
            'gender': req.body.sex
        });
        res.redirect('/parent');
    }
});

router.post('/parent/remove_child/:childId', function(req, res) {
    if (req.user === undefined) {
        res.redirect('/login');
    } else {
        var ObjectID = require('mongodb').ObjectID;
        var db = req.db;
        var children = db.get('children');
        var id = req.params.childId;
        var objId = new ObjectID(id);
        var email = req.user['email'];
        console.log(email);

        children.remove({
            'parent-email': email,
            '_id': objId
        });
        res.redirect('/parent');


    }
});



module.exports = router;
