var express = require('express');
var session = require('express-session')
var app = express();
var ect = require('ect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


//===============EXPRESS================

app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat'
}))
app.use(passport.initialize());
app.use(passport.session());

var ectRenderer = ect({
    watch: true,
    root: __dirname + '/views',
    ext: '.ect'
});
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(function(req, res, next) {
    req.db = db;
    next();
});

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/vaccine');
//var db = monk('sa:123456@ds023613.mlab.com:23613/vaccine')
//var db = monk ('sa:123456@ds021771.mlab.com:21771/udpt_vaccine');
var db = monk('mongodb://sa:123456@ds019960.mlab.com:19960/udpt');
//mongodb://<dbuser>:<dbpassword>@ds019960.mlab.com:19960/udpt
//===============ROUTES===============

app.use('/', require('./routes'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/parent'));
app.use('/', require('./routes/child'));
app.use('/', require('./routes/manager'));
app.use('/', require('./routes/vaccine'));

//===============PORT=================
app.listen(3000, function() {
    console.log('now listening on http://localhost:3000');
})

/*
mongo ds023613.mlab.com:23613/vaccine -u sa -p 123456
*/


//==================PASSPORT==============
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function(email, password, cb) {
        var users = db.get('users');
        users.findOne({
            email: email
        }, function(err, user) {
            if (err) {
                console.log("Khong ket noi CSDL");
                return cb(err);
            }

            if (!user) {
                return cb(null, false);
            }

            if (user['password'] != password) {
                console.log("Sai password");
                return cb(null, false);
            }
            console.log("Login thanh cong");
            return cb(null, user);
        });
    }));
//Login: Facebook
passport.use(new FacebookStrategy({
        clientID: '115652165524930',
        clientSecret: 'fccf4fc2fc8318f8332c124b385f3d19',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email'],
        session: false
    },
    function(accessToken, refreshToken, profile, cb) {
        var users = db.get('users');
        users.findOne({
            email: profile.emails[0].value
        }, function(err, user) {

            if (err) {
                return cb(err);
                console.log("Khong ket noi CSDL");
            }

            if (!user) {
                // Tao user moi
                var newUser = profile._json;
                users.insert({
                    'facebook_id': newUser.id,
                    'name': newUser.name,
                    'email': newUser.email
                }, function(err, insertedDoc) {

                });
                var new_user = {
                    facebook_id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }

                return cb(null, new_user);
            }
            return cb(null, user);
          });
      }
));

//Login: Google
passport.use(new GoogleStrategy({
        clientID: '922565830014-o4ocrqlilbou6g2dt4r5c1vr5lj611j7.apps.googleusercontent.com',
        clientSecret: 'TVH8JAFhjqaJl1fWzZ9dkcty',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        var users = db.get('users');
        users.findOne({
            email: profile.emails[0].value
        }, function(err, user) {

            if (err) {
                return cb(err);
                console.log("Khong ket noi CSDL");
            }

            if (!user) {
                // Tao user moi
                users.insert({
                    'name': profile.displayName,
                    'email': profile.emails[0].value
                }, function(err, insertedDoc) {

                });

                var new_user = {
                    name: profile.displayName,
                    email: profile.emails[0].value
                }

                return cb(null, new_user);
            }

            return cb(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(function(email, cb) {
    var users = db.get('users');
    users.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            console.log("Login error: Cannot find user");
            return cb(err);
        }
        cb(null, user);
    });
});
