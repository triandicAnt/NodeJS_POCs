var querystring = require('querystring');
var https = require('https');
var httpmodule = require('./httpModule');
var auth = require('./Auth');

// create parameters
var parameters = {
        placeid: "ChIJWWSXZUBfrIkR1MhKp1H8zc4",
        key : auth.API_KEY
};

// this function returns a closure that contains a HTTP request and response data
function placeDetais(format){
  // getDetais uses an http request to get response data
  function getDetails(parameters, callback){
    parameters.placeid = parameters.placeid || "ChIJWWSXZUBfrIkR1MhKp1H8zc4";
    // create options for http request
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/details/' + format + '?' + querystring.stringify(parameters)
    }
    // http request with options
    var request = https.request(options, new httpmodule(format = 'json',callback));
    request.on("error", function (error) {
                callback(new Error(error));
      });
      request.end();
  };
  // return the closure
  return getDetails;
};

// store the function returned in a variable
var placeDetailsFunc = new placeDetais(auth.FORMAT);

// export it to use in other modules
module.exports = {
  placeDetail: function (callback) {
    placeDetailsFunc(parameters,callback);
  }
};
