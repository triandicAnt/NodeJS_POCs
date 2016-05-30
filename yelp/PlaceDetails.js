var querystring = require('querystring');
var https = require('https');
var module = require('./httpModule');
/*
apiKey = "AIzaSyDiBagxn8ZbGxxG25JYu8c-THNseZLApj8";
format = "json";

function searchText(apiKey, format){
  return function(parameters, callback){
    parameters.key = apiKey;
    parameters.placeid = parameters.placeid || "ChIJI5JTm29frIkRPpzgRTTHd0A";
    if (typeof parameters.location === "object") {
        parameters.location = parameters.location.toString();
    }
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/details/' + format + '?' + querystring.stringify(parameters)
    }
    var request = https.request(options, new module(format = 'json',callback));
    request.on("error", function (error) {
                callback(new Error(error));
      });
      request.end();
  };
};

var searchText = new searchText(apiKey,format);
function returnParameters(place_id){
  var parameters = {
          placeid: place_id
  };
  return parameters;
}
*/
// var Search = require('./SearchText')
// var places = new Search(callback);
// console.log(Search);

require('./SearchText').initialize(function (err, data) {
  console.log(data);
});
