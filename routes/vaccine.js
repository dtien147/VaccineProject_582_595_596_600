var express = require('express');
var router = express.Router();


router.get('/vaccine', function(req, res) {
  if (req.user === undefined || req.user['type'] !== 'Parent') {
      res.redirect('/');
    } else {
        var db = req.db;
        var id = req.params.illnessId;
        var ObjectID = require('mongodb').ObjectID;
        var objId = new ObjectID(id);
        var vaccine = db.get('vaccines');

                vaccine.find({}, function(err2, vaccineList)
                {
                  if (vaccineList!==null)
                  {
                    res.render("vaccine.ect",
                     {
                       vaccineList: vaccineList
                     });
                   }

                   else {
                     res.render("vaccine.ect",
                      {


                      });
                   }
                  });
             }

          });



module.exports = router;
