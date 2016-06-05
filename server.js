var express = require('express');
var app = express();
var ect = require('ect');
var bodyParser = require('body-parser');

//===============EXPRESS================

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(function(req,res,next){
	req.db = db;
	next();
});


var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/udpt2');
var db = monk('sa:123456@ds023613.mlab.com:23613/vaccine')

//===============ROUTES===============

app.use('/', require('./routes'));
app.use('/', require('./routes/register'));
app.use(express.static('public'));
app.use(express.static('bower_components'));

//===============PORT=================
app.listen(3000, function () {
	console.log('now listening on http://localhost:3000');
})

/*
mongo ds023613.mlab.com:23613/vaccine -u sa -p 123456
*/