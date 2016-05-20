var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/
console.log('Hello')
/*
var merge = require('merge');
var yelp = require('node-yelp-api');
 
var options = {
  consumer_key: 'rUpTzr4ffrUp3zSHeX9yFQ',
  consumer_secret: 'p83Ea7afNax63n2pC6j33dUw34Y',
  token: 'eEeXhE6noM20VnLJ4tc3NlwW_tWdEtNr',
  token_secret: 'p4NOLqXsjgN7IYJ25sEvR52pLso',
};
 
// See http://www.yelp.com/developers/documentation/v2/search_api 
var parameters = {
  term: 'pizza',
  location: 'Raleigh',
};
yelp.search(merge(options, parameters), (data) => {
  console.log(data);
}, (err) => {
  console.error(err);
});
*/


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
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});
module.exports = app;
