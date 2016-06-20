var express = require ('express');
var router = express.Router();

router.get('/child', function (req, res)
{
  if (req.user===undefined)
    {
      res.redirect('/login');
    }

    else {


    }

});

router.get('/child/:childId', function(req, res)
{
  if(req.user === undefined)
  {
    res.redirect('/login');
  }

  else {
    var ObjectID = require('mongodb').ObjectID;
    var db = req.db;
    var children = db.get('children');
    var id = req.params.childId;
    var objId = new ObjectID(id);

    children.findOne({"_id": objId}, function (err, result)
    {
      if (err)
      {
        console.log(err);
      }

      else if (result!==null) {
        res.render("child.ect",
          {
            child_id: result['_id'],
            child_name: result['child_name'],
            birthday: result['birthday'],
            gender: result['gender']
          });
      }

    });
  }
});

router.post('/child/:childId', function (req, res)
{
  if(req.user === undefined)
  {
    res.redirect('/login');
  }

  else {

    var ObjectID = require('mongodb').ObjectID;
    var db = req.db;
    var children = db.get('children');
    var id = req.params.childId;
    var objId = new ObjectID(id);

    children.update(
      { "_id": objId },
      { $set: { "child_name": req.body.child_name, "birthday": req.body.datepicker, "gender": req.body.sex}}
    );

    res.redirect('/parent');
  }
});



module.exports = router;
