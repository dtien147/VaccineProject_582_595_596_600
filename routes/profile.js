var express = require('express');
var router = express.Router();

router.get('/parent/profile', function(req, res)
{
  if (req.user === undefined || req.user['type'] !== 'Parent') {
      res.redirect('/');
    }

    else {
      var db = req.db;
      var users = db.get("users");
      var email = req.user['email'];
      users.findOne({'email': email}, function(err, result)
      {
        if (err)
        {
          console.log(err);
        }

        else if (result !== null)
        {
          res.render("parent_profile.ect",
          {
            user: email
          });

        }
      });

    }
});

router.get('/profile', function(req, res)
{
  if (req.user === undefined) {
      res.redirect('/');
    }

    else if (req.user['type'] === 'Parent')
    {
      res.redirect('/parent/profile');
    }
});

router.post('/profile/changePassword', function(req, res)
{
  if (req.user === undefined || req.user['type'] !== 'Parent') {
      res.redirect('/');
    }

    else {
      var db = req.db;
      var users = db.get("users");
      var email = req.user['email'];
      var password = req.body.current_password;
      users.findOne({'email': email, 'password': password}, function(err, result)
      {
        if (err)
        {
          console.log(err);
        }

        else if (result !== null)
        {
          users.update(
            { "email": email},
            { $set: { "password": password}}
          );

        }
      });

    }
});

router.get('/log_out', function(req, res)
{
      req.session.destroy();
      res.redirect("/");
});



module.exports = router;
