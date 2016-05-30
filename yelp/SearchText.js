
/*var geocoder = require('geocoder');
// Geocoding
geocoder.geocode("3001 B, Kings Court, Raleigh", function ( err, data ) {
  console.log(data.results[0].geometry);
});
*/

var querystring = require('querystring');
var https = require('https');
var httpmodule = require('./httpModule');


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
    var request = https.request(options, new httpmodule(format = 'json',callback));
    request.on("error", function (error) {
                callback(new Error(error));
      });
      request.end();
  };
};



var searchFunction = new searchText(apiKey,format);
var parameters = {
        query: "restaurants in Raleigh"
};
  var places_id = [];

module.exports = {

  initialize: function (callback) {
    searchFunction(parameters,callback);
  }
};

/*
    searchFunction(parameters, function (error, response) {
      // return function(callback){
        if (error){
          // callback(error);
        }
        // console.log(response.results);
        var len = response.results.length;
        for(var i =0; i<len;i++){
            places_id.push(response.results[i].place_id);
        }
        console.log(places_id);
        // callback(err, places_id);
      // }

    });
//   }
// };

*/
