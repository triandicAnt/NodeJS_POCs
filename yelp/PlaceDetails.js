var querystring = require('querystring');
var https = require('https');
var httpmodule = require('./httpModule');
var auth = require('./Auth');

var places_ids = {};
function getSearchResults( callback){
  require('./SearchText').initialize(function (err, data) {
      if(err){
        callback(err);
      }
      var len = data.results.length;
      for(var i =0;i<len;i++){
        places_ids[data.results[i].place_id] = data.results[i].name;
    }
    callback(null,places_ids);
  });
}

function fetchData(err,data){
  if(err){
    console.log(err);
  }
  console.log(data);
}
function doOtherStuffs(){
  console.log('completed doing search');
}

getSearchResults(fetchData);
doOtherStuffs();

var parameters = {
        placeid: "ChIJWWSXZUBfrIkR1MhKp1H8zc4",
        key : auth.API_KEY
};

function placeDetais(format){
  function getDetails(parameters, callback){
    parameters.placeid = parameters.placeid || "ChIJWWSXZUBfrIkR1MhKp1H8zc4";
    var options = {
      hostname : 'maps.googleapis.com',
      path : '/maps/api/place/details/' + format + '?' + querystring.stringify(parameters)
    }
    var request = https.request(options, new httpmodule(format = 'json',callback));
    request.on("error", function (error) {
                callback(new Error(error));
      });
      request.end();
  };
  return getDetails;
};


var placeDetailsFunc = new placeDetais(auth.FORMAT);

function printDetails(err, data){
  if(err){
    throw err;
  }
  console.log(data);
}

placeDetailsFunc(parameters,printDetails);
