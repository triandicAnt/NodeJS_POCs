var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

require("yelp")
var Yelp = require('yelp');
var yelp = new Yelp({
 consumer_key: 'rUpTzr4ffrUp3zSHeX9yFQ',
  consumer_secret: 'p83Ea7afNax63n2pC6j33dUw34Y',
  token: 'eEeXhE6noM20VnLJ4tc3NlwW_tWdEtNr',
  token_secret: 'p4NOLqXsjgN7IYJ25sEvR52pLso',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  // console.log(data);
  var jsonString = JSON.stringify(data);
  jsonBussObj = JSON.parse(jsonString).businesses;
  // console.log(jsonBussObj);
  var l = jsonBussObj.length;
  for(var i = 0; i<l;i++){
    // var bussinessString = JSON.stringify(bussObj);
    console.log(jsonBussObj[i]);
  }

})
.catch(function (err) {
  console.error(err);
});
module.exports = app;