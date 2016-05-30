// Find the longitude and latitude of a location
/*var geocoder = require('geocoder');
// Geocoding
geocoder.geocode("3001 B, Kings Court, Raleigh", function ( err, data ) {
  console.log(data.results[0].geometry);
});
*/
// includes API_KEY and FORMAT

var auth = require('./Auth');

var querystring = require('querystring');
var https = require('https');
// include httpModule which accumulates the response data
var httpmodule = require('./httpModule');

// create a parameter with API_KEY and query to search
var parameters = {
        key : auth.API_KEY,
        query: "food, Raleigh"
};

// searchText function that creates a HTTP request:
function searchText(format){
  function searchData(parameters, callback){
    // if parameter query does not exist add restaurants
    parameters.query = parameters.query || "restaurant";
    // create an option for the HTTP request
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/textsearch/' + format + '?' + querystring.stringify(parameters)
    }
    // create an HTTP request and pass our httpModule as callback to accumulate the response texts
    var request = https.request(options, new httpmodule(format = 'json',callback));
    //incase of error send it back to callback
    request.on("error", function (error) {
                callback(new Error(error));
      });
      // close the request
      request.end();
  };
  // return the function(closure)
  return searchData;
};

// store the closure in a new variable
var searchFunction = new searchText(auth.FORMAT);

// export the call to searchFunction so that we can use it in other modules.
module.exports = {
  searchText: function (callback) {
    // calling searchFunction by passing parameters and callback
    searchFunction(parameters,callback);
  }
};
