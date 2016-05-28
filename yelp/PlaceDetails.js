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
var places_id = require('./SearchText')

// console.log(places_id);

/*
searchText(parameters, function (error, response) {
    if (error) throw error;
    // console.log(response.results);
    var len = response.results.length;
    var places_id = [];
    for(var i =0; i<len;i++){
        places_id.push(response.results[i].place_id);
    }
    console.log(places_id);
});
*/
// textSearch();
