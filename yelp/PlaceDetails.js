var querystring = require('querystring');
var https = require('https');
var module = require('./httpModule');

apiKey = "AIzaSyDiBagxn8ZbGxxG25JYu8c-THNseZLApj8";
format = "json";
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
getSearchResults(fetchData);
function fetchData(err,data){
  if(err){
    console.log(err);
  }
  console.log(data);
}
