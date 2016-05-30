## Using Google Places web service from Node.js</br>
### Requirement:
1. Get data from a search query(e.g. restaurants in Raleigh) </br>
2. Get places details from a place id.</br>

###Procedure:
* Create a new project using Express:</br>
```javascript
express googleplaces
```
* HTTP Response Process:</br>
Create a new file 'httpModule.js' which will accumulate all the response data and concatenate in a single string.</br>
```javascript
//export it to module
module.exports = function (parseJson, callback){

  function httpReqFunc(response){
     var resData = ""; // string in which all data will be concatenated
     // incase of error, send it back to callback
    response.on("error", function(data){
        console.log("Something bad happened");
        callback(err); // sending error to callback
    });
    // id its of data tyoe, append it to to 'resData'
    response.on("data", function(data){
      resData= resData + data;
    });
    // in end send accumulated data to callback
    response.on("end", function(error){
        if(error){
            throw error;
        }
        // check for JSON type
        if(parseJson==='json'){
          resData = JSON.parse(resData);
          callback(null,resData);
        }
      });
  };
  // return the function (closure)
  return httpReqFunc;

};
```
#### Search Text </br>
* Using Google places web service(https://developers.google.com/places/web-service/) we can get details about the query string in JSON format.
The request url is the following: </br>
https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=YOUR_API_KEY</br>
We can pass our value in query string and API KEY to get the response in either JSON or XML format.
Include the required modules:
```javascript
// includes API_KEY and FORMAT

var auth = require('./Auth');

var querystring = require('querystring');
var https = require('https');
// include httpModule which accumulates the response data
var httpmodule = require('./httpModule');
```
* Create a parameter variable that we will use to pass in the request url:
```javascript
// create a parameter with API_KEY and query to search
var parameters = {
        key : auth.API_KEY,
        query: "food, Raleigh"
};
```
* Now, we will create a HTTP request by passing our parameters:</br>
```javascript
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
```
* This method returns a closure. We have to store it in a new variable:
```javascript
// store the closure in a new variable
var searchFunction = new searchText(auth.FORMAT);
```
* Now, we can export it to use in other modules:</br>
```javascript
// export the call to searchFunction so that we can use it in other modules.
module.exports = {
  searchText: function (callback) {
    // calling searchFunction by passing parameters and callback
    searchFunction(parameters,callback);
  }
};
```
* Fetching data for a search query: </br>
```javascript
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
```
* Following is the sample response with the query as (food, Raleigh):
```dictionary
{
  ChIJgR6rtfNdrIkRPm-TKC-ImE4': 'Food Lion',
  ChIJFRsbhxpZrIkRbcMV5DDxhyc: 'International Foods',
  ChIJQadsfOxZrIkRTmB5Voc342E: 'Food truck rodeo',
  ChIJ00VP4TRfrIkRFzgMguNxqlg: 'Lighthouse Food Mart' 
}
```
#### Place Details: </br>
 Similary we can get the place details by changing our 'options' and the 'parameters'.
```javascript
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
```
