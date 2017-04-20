# POCs in Node js
### Contents:
* [Facebook Graph API](#fbgraph)  
* [Google Places API](#googleplaces)
* [Yelp API](#yelp)
* [YouTube API](#youtube)


<a name="fbgraph"></a>
## fbgraph: [Facebook Graph API](https://github.com/sudhansusingh22/NodeJS_POCs/tree/master/fbgraph)

* Using FB Graph API get data of Group and users and save it to Google Firebase.

#### Dependencies :
* node js
* Facebook Graph API

#### Steps To Run:
* Create a `Config` file in `test` folder. Get the information from Facebook Developers website and Firebase App website:
```javascript
// Facebook app config for tests
module.exports = {
  facebook: {
    appId:       '***appid***',
    appSecret:   '***appsecret***
    scope:       'email, user_about_me, user_birthday, user_location, publish_stream, read_stream, friends_location',
    callback:    'http://localhost:3000/',
    accessToken: 'access token *******',
    groupUrl:    '***groupId****/feed?fields=created_time,updated_time,from,shares,story,link, id, message, name,place,attachments&limit=50'
  },
  fbase: {
	kDBBaseRef  :  '***Firebase base ref***',
	kDBPostRef  :  '***tables***',
	kDBUserRef  :  '***tables***',
	kDBImageRef :  '***tables***',
	kDBLogRef   :  '***tables***',
 	projectId   :  '***Project ID***',
	clientEmail :  '***Client Email***',
	privateKey  :  '***Firebase Private Key***'

  }
};
```
* Run `server.js`:
```javascript
node server.js
```
<a name="googleplaces"></a>
## googleplaces: [Google Places API](https://github.com/sudhansusingh22/NodeJS_POCs/tree/master/googleplaces)
* Get nearby places information using Node js.

#### Requirement:
1. Get data from a search query(e.g. restaurants in Raleigh) </br>
2. Get places details from a place id.</br>

#### Steps To Run:
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
We can pass our value in query string and API KEY to get the response in either JSON or XML format.</br>
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
 Similarly we can get the place details by changing our 'options' and the 'parameters'.
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

<a name="yelp"></a>
## Yelp :  [Yelp API](https://github.com/sudhansusingh22/NodeJS_POCs/tree/master/yelp)
* Fetch Yelp data using Node js.
#### Requirement:
1. Fetch Business data using Yelp API for Node.js </br>
2. Parse response object to JSON object </br>
3. Create a 'Business' model to store each JSON object data</br>
4. Store the model in MongoDB using 'mongoose'</br>

#### Required Packages:
1. Yelp API for Node.js (https://github.com/olalonde/node-yelp) </br>
2. Mongoose package (https://www.npmjs.com/package/mongoose) </br> 

#### Steps To Run:
* First create a new project using Express:</br>
```javascript
express yelp
```
* Add the required package for 'yelp'</br>
```javascript
require("yelp")
var Yelp = require('yelp');
```
* Create a new yelp object by passing your authentication tokens:</br>
```javascript
var yelp = new Yelp({
 consumer_key: 'YOUR CONSUMER KEY',
  consumer_secret: 'YOUR CONSUMER SECRET',
  token: 'YOUR TOKEN',
  token_secret: 'YOUR TOKEN SECRET',
});
```
* You can get your authentication tokens from : https://www.yelp.com/developers/manage_api_keys

* Call the search method by passing your arguments. In this case we are passing 'search term' and 'location'.</br>
```javascript
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  // console.log(data); // print the data returned from the API call
  var jsonString = JSON.stringify(data); // convert data to JSON string
  jsonBussObj = JSON.parse(jsonString).businesses; // Parse JSON string to JSON Object
  // console.log(jsonBussObj); // Print each business JSON object
  var l = jsonBussObj.length; // Print length
})
.catch(function (err) {
  console.error(err);
});
```
* The 'jsonBussObject' will look like the following:</br>
```dictionary
{ is_claimed: true,
  rating: 4.5,
  mobile_url: 'http://m.yelp.com/biz/omnivore-montr%C3%A9al-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=rUpTzr4ffrUp3zSHeX9yFQ',
  rating_img_url: 'https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
  review_count: 85,
  name: 'Omnivore',
  rating_img_url_small: 'https://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
  url: 'http://www.yelp.com/biz/omnivore-montr%C3%A9al-2?utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=rUpTzr4ffrUp3zSHeX9yFQ',
  categories: 
   [ [ 'Mediterranean', 'mediterranean' ],
     [ 'Lebanese', 'lebanese' ] ],
  phone: '5143035757',
  snippet_text: 'Simple, incredibly tasty and definitely worth coming back!\n\nVentured here after seeing good yelp reviews in search of middle eastern food - the place...',
  image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/3NEj_NILqQ6mrpLpDiKtTQ/ms.jpg',
  snippet_image_url: 'http://s3-media4.fl.yelpcdn.com/photo/BGep8G6x6YF-_fWHQzhnfg/ms.jpg',
  display_phone: '+1-514-303-5757',
  rating_img_url_large: 'https://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
  id: 'omnivore-montréal-2',
  is_closed: false,
  location: 
   { city: 'Montréal',
     display_address: 
      [ '4351 boulevard Saint-Laurent',
        'Plateau-Mont-Royal',
        'Montréal, QC H2W 1Z8',
        'Canada' ],
     geo_accuracy: 8,
     neighborhoods: [ 'Plateau-Mont-Royal' ],
     postal_code: 'H2W 1Z8',
     country_code: 'CA',
     address: [ '4351 boulevard Saint-Laurent' ],
     coordinate: { latitude: 45.51924, longitude: -73.58407 },
     state_code: 'QC' } }
```
 * Now, we have JSON data and we want to store it in a MongoDB database. We will be using 'mongoose' package for this.</br>
 Install mongoose using npm and create a new directory in your project structure and name it 'models'. </br>
 Create a new file named 'models.js'. It will have a new model to store JSON object data. </br>
 Inside 'models.js' add required mongoose package and define a 'Schema' object.</br>
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
```
 * Define a business schema to store each key/value from JSON data object.
```javascript
// Defining a schema for Business
var businessSchema = new mongoose.Schema({
    is_claimed : Boolean,
    rating : String,
    mobile_url: String,
    rating_img_url: String,
    review_count: String,
    name: String,
    rating_img_url_small: String,
    url: String,
    categories:Object,
    phone: String,
    snippet_text: String,
    image_url: String,
    snippet_image_url: String,
    display_phone: String,
    rating_img_url_large: String,
    id: String,
    is_closed: Boolean,
    location:Object 
});
```
* Add the model to mongoose:</br>
```javascript
mongoose.model('Business', businessSchema);
```
* Now we can connect to our mongoDB database: </br>
```javascript
// Connect to MongoDB
require('./models/models');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp'); // yelp as collection name 
```
* And load our business model:
```javascript
var Business = mongoose.model('Business');
```
*  Inside the search API function we can instantiate our business model and add each corresponding values:
```javascript
    var newBusiness = new Business();

    newBusiness.is_claimed  = bussiObj.is_claimed;
    newBusiness.rating  = bussiObj.rating;
    newBusiness.mobile_url = bussiObj.mobile_url;
    newBusiness.rating_img_url = bussiObj.rating_img_url;
    newBusiness.review_count = bussiObj.review_count;
    newBusiness.name = bussiObj.bussiObj;
    newBusiness.rating_img_url_small = bussiObj.rating_img_url_small;
    newBusiness.url = bussiObj.url;
    newBusiness.categories = bussiObj.categories;
    newBusiness.phone = bussiObj.phone;
    newBusiness.snippet_text = bussiObj.snippet_text;
    newBusiness.image_url = bussiObj.image_url;
    newBusiness.snippet_image_url = bussiObj.snippet_image_url;
    newBusiness.display_phone = bussiObj.display_phone;
    newBusiness.rating_img_url_large = bussiObj.rating_img_url_large;
    newBusiness.id = bussiObj.id;
    newBusiness.is_closed = bussiObj.is_closed;
    newBusiness.location = bussiObj.location;
```
 * Finally store our model to database in the collection named as 'yelp'.
```javascript
newBusiness.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
        }
    });
```
* The collection object will look like the following:

![alt tag](https://github.com/sudhansusingh22/soMEAN/blob/master/yelp/yelp_collection.png)

<a name="youtube"></a>
## Youtube : [YouTube API](https://github.com/sudhansusingh22/NodeJS_POCs/blob/master/youtube)
* Fetch Youtube videos data and metadata using Node js.

#### Requirements:
* Youtube API
* Firebase
* Node JS
* youtube-api

#### Steps To Run:
* Add Configuration details in `config.js`:
```javascript
// Youtube app config for tests
module.exports = {
  youtube: {
    API:    	'***API Key***'
  },
  fbase: {
	kDBBaseRef  :  '***Database URL***',
	kDBPostRef  :  '/videos',
	kDBUserRef  :  '/users',
	kDBLogRef   :  '/log',
 	projectId   :  '***Project Id***',
	clientEmail :  '***Client Email***',
	privateKey  :  '***Private Key***'
  }
};
```
* Add YouTube API Key in index.js.
* Run `app.js`
```javascript
node app.js
```


