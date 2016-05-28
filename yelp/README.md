## Using Yelp API in Node.js</br>
### Requirement:
1. Fetch Business data using Yelp API for Node.js </br>
2. Parse response object to JSON object </br>
3. Create a 'Business' model to store each JSON object data</br>
4. Store the model in MongoDB using 'mongoose'</br>

### Required Packages:
1. Yelp API for Node.js (https://github.com/olalonde/node-yelp) </br>
2. Mongoose package (https://www.npmjs.com/package/mongoose) </br> 

###Procedure:
 First create a new project using Express:</br>
```javascript
express yelp
```
 Add the required package for 'yelp'</br>
```javascript
require("yelp")
var Yelp = require('yelp');
```
 Create a new yelp object by passing your authentication tokens:</br>
```javascript
var yelp = new Yelp({
 consumer_key: 'YOUR CONSUMER KEY',
  consumer_secret: 'YOUR CONSUMER SECRET',
  token: 'YOUR TOKEN',
  token_secret: 'YOUR TOKEN SECRET',
});
```
You can get your authentication tokens from : https://www.yelp.com/developers/manage_api_keys

 Call the search method by passing your arguments. In this case we are passing 'search term' and 'location'.</br>
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
The 'jsonBussObject' will look like the following:</br>
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
 Now, we have JSON data and we want to store it in a MongoDB database. We will be using 'mongoose' package for this.</br>
 Install mongoose using npm and create a new directory in your project structure and name it 'models'. </br>
 Create a new file named 'models.js'. It will have a new model to store JSON object data. </br>
 Inside 'models.js' add required mongoose package and define a 'Schema' object.</br>
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
```
 Define a business schema to store each key/value from JSON data object.
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
 Add the model to mongoose:</br>
```javascript
mongoose.model('Business', businessSchema);
```
 Now we can connect to our mongoDB database: </br>
```javascript
// Connect to MongoDB
require('./models/models');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp'); // yelp as collection name 
```
And load our business model:
```javascript
var Business = mongoose.model('Business');
```
 Inside the search API function we can instantiate our business model and add each corresponding values:
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
 Finally store our model to database in the collection named as 'yelp'.
```javascript
newBusiness.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
        }
    });
```
