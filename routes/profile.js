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
      var new_pass = req.body.new_password;
      var confirm_pass = req.body.confirm_new_password;
      if (new_pass!==confirm_pass)
      {
        res.render("parent_profile.ect",  {error1: "Mật khẩu xác nhận không đúng"});
      }

      else {
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
              { $set: { "password": confirm_pass}}
            );

            res.redirect("/parent/profile");

          }

          else {
            res.render("parent_profile.ect",  {error: "Mật khẩu không đúng hoặc bạn đang sử dụng tài khoản Google (Facebook)"});
          }


        });

      }


    }
});

router.get('/log_out', function(req, res)
{
      req.session.destroy();




      res.redirect("/login");
});



module.exports = router;
