// add required module
var SearchText = require('./SearchText');

// create a dictionary to store only placeid  an place names
var places_ids = {};
//create a function that invokes the searchText to fetch query data
function getSearchResults( callback){
  SearchText.searchText(function (err, data) {
      if(err){
        callback(err);
      }
      var len = data.results.length;
      // iterate over the response data and add placeid and place name as key and value in the dictionary
      for(var i =0;i<len;i++){
        places_ids[data.results[i].place_id] = data.results[i].name;
    }
    callback(null,places_ids);
  });
}

// fetch data callback method
function fetchData(err,data){
  if(err){
    console.log(err);
  }
  // print the dictionary containing placeid and place name
  console.log(data);
}

// call getSearchResults passing the callback
getSearchResults(fetchData);

var placeDetails = require('./PlaceDetails')
function getPlaceDetailResults( callback){
  placeDetails.placeDetail(function (err, data) {
      if(err){
        callback(err);
      }
    callback(null,data);
  });
}

getPlaceDetailResults(fetchData);
