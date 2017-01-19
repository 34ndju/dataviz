//initialize all node packages
require('dotenv').load();
var pug = require('pug');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = process.env.PORT || 8080;

//setting read engine from html to pug and view folder to /views
app.set('views', './views')
app.set('view engine', 'pug')

//enable json parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//setting client-readings to client folder
app.use(express.static(path.resolve(__dirname, 'client')));

//add all routing
require('./routes')(express, app, bodyParser, path)
    
//begin server
app.listen(port, function() {
    console.log("Listening on port " + port)
})