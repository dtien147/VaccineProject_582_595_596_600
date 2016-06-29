var express = require ('express');
var router = express.Router();

router.get('/child', function (req, res)
{
  if (req.user===undefined)
    {
      res.redirect('/login');
    }

    else {
      res.render("child.ect", {});
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
    var vaccine = db.get('vaccines');
    var notes = db.get('notes');

    children.findOne({"_id": objId}, function (err, result)
    {
      if (err)
      {
        console.log(err);
      }

      else if (result!==null)
      {
          vaccine.find({}, function(err2, vaccineList)
          {

            notes.find({'childId': id}, function(err3, noteList)
            {

              if (vaccineList!==null && noteList!==null)
              {
              res.render("child.ect",
                {
                  notes: noteList,
                  vaccineList: vaccineList,
                  child_id: result['_id'],
                  child_name: result['child_name'],
                  birthday: result['birthday'],
                  gender: result['gender']
                });
              }

              else if (noteList ===  null)
               {
                res.render("child.ect",
                  {
                    vaccineList: vaccineList,
                    child_id: result['_id'],
                    child_name: result['child_name'],
                    birthday: result['birthday'],
                    gender: result['gender']
                  });
              }
              else if (vaccineList===null)
              {

                res.render("child.ect",
                  {
                    child_id: result['_id'],
                    child_name: result['child_name'],
                    birthday: result['birthday'],
                    gender: result['gender']
                  });
              }
            });
          });
        }

        else
        {
          res.redirect('/child');
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

    res.redirect('/child/' + id);
  }
});

router.post('/child/:childId/add_note', function(req, res)
{
  if (req.user === undefined)
  {
    res.redirect('/login');
  }

  else {
    var ObjectID = require('mongodb').ObjectID;
    var db = req.db;
    var notes = db.get('notes');
    var id = req.params.childId;
    notes.insert(
    {
      'childId': req.params.childId,
      'date': req.body.datepickerSchedule,
      'vaccine': req.body.vaccinePicker,
      'noteContent': req.body.txtNoteContent,
      'status': 'to do'
    });

    res.redirect('/child/' + id );
  }
});

router.get('/child/:childId/complete_note/:noteId', function (req, res)
{
  if (req.user === undefined)
  {
    res.redirect('/login');
  }

  else {
    var ObjectID = require('mongodb').ObjectID;
    var db = req.db;
    var notes = db.get('notes');
    var id = req.params.noteId;
    var objId = new ObjectID(id);

    notes.findOne({"_id": objId}, function(err, result)
    {
      if (err)
      {
        console.log(err);
      }

      else if (result!==null)
      {
        notes.update
        (
          { "_id": objId },
          { $set: { "status": "done"}}
        );
      }
      id = req.params.childId;
      res.redirect('/child/' + id );
    });
  }


});

router.get('/child/:childId/remove_note/:noteId', function (req, res)
{
  if (req.user === undefined)
  {
    res.redirect('/login');
  }

  else {
    var ObjectID = require('mongodb').ObjectID;
    var db = req.db;
    var notes = db.get('notes');
    var id = req.params.noteId;
    var objId = new ObjectID(id);

    notes.findOne({"_id": objId}, function(err, result)
    {
      if (err)
      {
        console.log(err);
      }

      else if (result!==null)
      {
        notes.remove
        (
          { "_id": objId }
        );
      }
      id = req.params.childId;
      res.redirect('/child/' + id );
    });
  }


});



module.exports = router;
