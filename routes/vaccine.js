var express = require('express');
var router = express.Router();


router.get('/vaccine/:illnessId', function(req, res) {
    if (req.user === undefined) {
        res.redirect('/login');
    } else {
        var db = req.db;
        var illness = db.get('illness');
        var id = req.params.illnessId;
        var ObjectID = require('mongodb').ObjectID;
        var objId = new ObjectID(id);
        var vaccine = db.get('vaccine');
        illness.find({}, function(err, illnessList)
        {
          if(err)
          {
            console.log(err);
          }

          else if (illnessList!==null)
          {

            illness.findOne({"_id": objId}, function(err1, result)
            {
              if (err1)
              {
                console.log(err1);
              }

              else if (result!==null)
              {

                vaccine.find({'vaccine_illness': result['type']}, function(err2, vaccineList)
                {
                  if (vaccineList!==null)
                  {
                    res.render("vaccine.ect",
                     {
                       illnessList: illnessList,
                       illness: result['type'],
                       vaccineList: vaccineList
                     });
                   }

                   else {
                     res.render("vaccine.ect",
                      {
                        illnessList: illnessList,
                        illness: result['type'],

                      });
                   }
                  });
             }

               else {
                 res.render("vaccine.ect",
                  {
                    illnessList: illnessList

                  });
               }
           });
          }

          else
          {
            res.render("vaccine.ect", {});
          }
        });


      }


      });




module.exports = router;
