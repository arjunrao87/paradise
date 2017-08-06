require('dotenv').config()
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var requests = require( "./requests" );
var logger = require('./log.js')

var app = express();
app.use(bodyParser.json());

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.get('/', function (req, res) {
  console.log( "Hit homepage...");
  res.send('Paradise is up and running...\n' );
});

app.listen(PORT, HOST);

//------------------- Defining routes -------------------//

app.post('/beach', function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  logger.info( "Received Latitude = " + latitude + ", longitude = " + longitude );
});
