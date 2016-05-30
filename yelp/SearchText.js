// Find the longitude and latitude of a location
/*var geocoder = require('geocoder');
// Geocoding
geocoder.geocode("3001 B, Kings Court, Raleigh", function ( err, data ) {
  console.log(data.results[0].geometry);
});
*/

var querystring = require('querystring');
var https = require('https');
var httpmodule = require('./httpModule');
var apiKey = "AIzaSyDiBagxn8ZbGxxG25JYu8c-THNseZLApj8";
var format = "json";

var parameters = {
        key : apiKey,
        query: "food, Raleigh"
};


function searchText(format){
  function searchData(parameters, callback){
    parameters.query = parameters.query || "restaurant";
    if (typeof parameters.location === "object") {
        parameters.location = parameters.location.toString();
    }
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/textsearch/' + format + '?' + querystring.stringify(parameters)
    }
    var request = https.request(options, new httpmodule(format = 'json',callback));
    request.on("error", function (error) {
                callback(new Error(error));
      });
      request.end();
  };
  return searchData;
};


var searchFunction = new searchText(format);

module.exports = {
  initialize: function (callback) {
    searchFunction(parameters,callback);
  }
};
