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
var jshare = require('jshare');


//===============EXPRESS================
app.use(jshare());
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
var db = monk('sa:123456@ds021771.mlab.com:21771/udpt_vaccine');
//var db = monk('mongodb://sa:123456@ds019960.mlab.com:19960/udpt');
//mongodb://<dbuser>:<dbpassword>@ds019960.mlab.com:19960/udpt
//===============ROUTES===============

app.use('/', require('./routes'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/parent'));
app.use('/', require('./routes/child'));
app.use('/', require('./routes/manager'));
app.use('/', require('./routes/vaccine'));
app.use('/', require('./routes/calendar'));
app.use('/', require('./routes/profile'));

//===============REMINDER=================
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://superpigudpt%40gmail.com:tien1234@smtp.gmail.com');

var sendMail = function(child, vaccine, doseIndex, doseDate) {
    var mailOptions = {
        from: '"Vaccine Reminder" <reminder@vaccine.com>',
        to: child['parent-email'],
        subject: child.child_name + ' should be vaccinated on ' + doseDate,
        html: '<div>Vaccine:' + vaccine.name +
            '</div><div>Dose:' + (doseIndex + 1) + '</div>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

var getDoseDate = function(childBirthday, dose) {
    var date = new Date(childBirthday.getTime());
    if (dose.unit === 'Hour') {
        date.setHours(date.getHours() + dose.value);
    } else if (dose.unit === 'Day') {
        date.setDate(date.getDate() + dose.value);
    } else if (dose.unit === 'Month') {
        date.setMonth(date.getMonth() + dose.value);
    } else if (dose.unit == 'Year') {
        date.setYear(date.getYear() + dose.value);
    }
    return date;
}

var schedule = function(child) {
    var parts = child.birthday.split('/');
    var birthday = new Date(parts[2], parts[0] - 1, parts[1]);
    var vaccineDB = db.get('vaccines');
    var curDate = new Date();
    vaccineDB.find({}, function(err, vaccineList) {
        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < vaccineList.length; i++) {
                var doseList = vaccineList[i].doses;
                for (var j = 0; j < doseList.length; j++) {
                    var doseDate = getDoseDate(birthday, doseList[j]);
                    if (doseDate.getYear() === curDate.getYear() &&
                        doseDate.getMonth() === curDate.getMonth() &&
                        doseDate.getDate() - curDate.getDate() === 7)
                        sendMail(child, vaccineList[i], j, doseDate);
                }
            }
        }
    });
}

var remind = function() {
    var cron = require('cron');
    var cronJob = cron.job('0 0 0 * * *', function() {
        var childDB = db.get('children');
        childDB.find({}, function(err, childList) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < childList.length; i++) {
                    if (childList[i].isReminded === "on") {
                        schedule(childList[i]);
                    }
                }

            }
        });
    });
    cronJob.start();
};

//===============PORT=================
app.listen(3000, function() {
    console.log('now listening on http://localhost:3000');
    remind();
});
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
        callbackURL: "https://vaccine-reminder.herokuapp.com/auth/facebook/callback",
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
                    'name': newUser.name,
                    'email': newUser.email,
                    'type': 'Parent'
                }, function(err, insertedDoc) {

                });

                var new_user = {
                    name: newUser.name,
                    email: newUser.email,
                    type: 'Parent'
                }

                console.log(new_user);

                console.log("return new_user");

                return cb(null, new_user);
            }
            console.log("return user");
            return cb(null, user);
        });
    }
));

//Login: Google
passport.use(new GoogleStrategy({
        clientID: '922565830014-o4ocrqlilbou6g2dt4r5c1vr5lj611j7.apps.googleusercontent.com',
        clientSecret: 'TVH8JAFhjqaJl1fWzZ9dkcty',
        callbackURL: "https://vaccine-reminder.herokuapp.com/auth/google/callback",
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
                users.insert({
                    'name': profile.displayName,
                    'email': profile.emails[0].value,
                    'type': 'Parent'
                }, function(err, insertedDoc) {

                });

                var new_user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    type: 'Parent'
                }

                return cb(null, new_user);
            }

            console.log("return user");
            return cb(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    console.log("bat dau serializeUser");
    console.log("user email = " + user.email);
    cb(null, user.email);
});

passport.deserializeUser(function(email, cb) {
    console.log("bat dau deserializeUser");
    console.log("email = " + email);
    var users = db.get('users');
    users.findOne({
        email: email
    }, function(err, user) {
        if (err) {
            console.log("Login error: Cannot find user");
            return cb(err);
        }
        console.log("Ket qua deserializeUser:");
        console.log(user);
        cb(null, user);
    });
});
