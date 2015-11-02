var express = require('express');
var server = express();

var port = process.env.PORT || 8080;

var morgan = require('morgan'); // log to comsole (express4)
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // similate DELETE and PUT (express4)

var mongoose   = require('mongoose');
var Contact    = require('./app/models/contact');

server.use(express.static(__dirname + '/public'));
server.use('/bower_components', express.static( __dirname + '/bower_components'));
// EI TOIMI   server.use(express.static( __dirname + '/bower_components'));

server.use(morgan('combined')); // logs all http request basic data (header)
server.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
server.use(bodyParser.json());
server.use(bodyParser.json({ type: 'application/vnd.api+json'})); // Mikä tämä???
server.use(methodOverride());

//mongoose.connect('mongodb://localhost/test');

// routes ======================================================================
require('./app/routes.js')(server);
require('./app/contacts.js');

//var port = 8080;
server.listen(port);
console.log('server listening on port ' + port);

//server.listen(port, function() {
//	console.log('server listening on port ' + port);
//});
