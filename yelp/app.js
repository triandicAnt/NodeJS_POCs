var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Connect to MongoDB
require('./models/models');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp');  
var Business = mongoose.model('Business');


require("yelp")
var Yelp = require('yelp');
var yelp = new Yelp({
 consumer_key: 'rUpTzr4ffrUp3zSHeX9yFQ',
  consumer_secret: 'p83Ea7afNax63n2pC6j33dUw34Y',
  token: 'eEeXhE6noM20VnLJ4tc3NlwW_tWdEtNr',
  token_secret: 'p4NOLqXsjgN7IYJ25sEvR52pLso',
});

yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  // console.log(data);
  var jsonString = JSON.stringify(data);
  jsonBussObj = JSON.parse(jsonString).businesses;
  // console.log(jsonBussObj);
  var l = jsonBussObj.length;
  for(var i = 0; i<l;i++){
    var bussiObj = jsonBussObj[i];
    var newBusiness = new Business();

    newBusiness.is_claimed  = bussiObj.is_claimed;
    newBusiness.rating  = bussiObj.rating;
    newBusiness.mobile_url = bussiObj.mobile_url;
    newBusiness.rating_img_url = bussiObj.rating_img_url;
    newBusiness.review_count = bussiObj.review_count;
    newBusiness.name = bussiObj.bussiObj;
    newBusiness.rating_img_url_small = bussiObj.rating_img_url_small;
    newBusiness.url = bussiObj.url;
    newBusiness.categories = bussiObj.categories;
    newBusiness.phone = bussiObj.phone;
    newBusiness.snippet_text = bussiObj.snippet_text;
    newBusiness.image_url = bussiObj.image_url;
    newBusiness.snippet_image_url = bussiObj.snippet_image_url;
    newBusiness.display_phone = bussiObj.display_phone;
    newBusiness.rating_img_url_large = bussiObj.rating_img_url_large;
    newBusiness.id = bussiObj.id;
    newBusiness.is_closed = bussiObj.is_closed;
    newBusiness.location = bussiObj.location;

    // save the user
    newBusiness.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
        }
    });
  }
  console.log('Done saving to database.');

})
.catch(function (err) {
  console.error(err);
});

module.exports = app;