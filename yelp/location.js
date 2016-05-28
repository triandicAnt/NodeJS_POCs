
/*var geocoder = require('geocoder');
// Geocoding
geocoder.geocode("3001 B, Kings Court, Raleigh", function ( err, data ) {
  console.log(data.results[0].geometry);
});
*/

var querystring = require('querystring');
var https = require('https');
var module = require('./httpModule');

apiKey = "AIzaSyDiBagxn8ZbGxxG25JYu8c-THNseZLApj8";
format = "json";

function searchText(apiKey, format){
  return function(parameters, callback){
    parameters.key = apiKey;
    parameters.query = parameters.query || "restaurant";
    if (typeof parameters.location === "object") {
        parameters.location = parameters.location.toString();
    }
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/textsearch/' + format + '?' + querystring.stringify(parameters)
    }
    var request = https.request(options, new module(format = 'json',callback));
    request.on("error", function (error) {
                callback(new Error(error));
      });
      request.end();
  };
};

var searchText = new searchText(apiKey,format);
var parameters = {
        query: "restaurants in raleigh"
};

searchText(parameters, function (error, response) {
    if (error) throw error;
    console.log(response.results);
});

// textSearch();
