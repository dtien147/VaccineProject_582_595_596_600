var express = require('express');
var session = require('express-session')
var app = express();
var ect = require('ect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


//===============EXPRESS================

app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({secret: 'keyboard cat'}))
app.use(passport.initialize());
app.use(passport.session());




var ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(function(req,res,next){
  req.db = db;
  next();
});


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/vaccine');
//var db = monk('sa:123456@ds023613.mlab.com:23613/vaccine')
var db = monk ('sa:123456@ds021771.mlab.com:21771/udpt_vaccine');
//===============ROUTES===============

app.use('/', require('./routes'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/parent'));


//===============PORT=================
app.listen(3000, function () {
  console.log('now listening on http://localhost:3000');
})

/*
mongo ds023613.mlab.com:23613/vaccine -u sa -p 123456
*/


//==================PASSPORT==============
passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
function(email, password, cb) {
  console.log(email);
  var users = db.get('users');
  users.findOne({ email: email }, function (err, user) {
    if (err) {
      return cb(err);
      console.log("Khong ket noi CSDL");
    }

    if (!user) {
      return cb(null, false);
      console.log("Khong ton tai user");
    }

    if (user['password'] != password) {
      return cb(null, false);
      console.log("Sai password");
    }
    console.log("Login thanh cong");
    return cb(null, user);
  });
}));


passport.serializeUser(function(user, cb) {
  cb(null, user.email);
});

passport.deserializeUser(function(email, cb) {
  var users = db.get('users');
  users.findOne({ email: email }, function (err, user) {
    if (err) {
      return cb(err);
      console.log("Login error: Cannot find user");
    }
    console.log(user);
    cb(null, user);
  });
});
