var express = require('express');
var app = express();
var ect = require('ect');
var ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

var routes = require('./routes');
app.use('/', routes);
app.use(express.static('public'));
app.use(express.static('bower_components'));


app.listen(3000, function () {
	console.log('now listening on http://localhost:3000');
})