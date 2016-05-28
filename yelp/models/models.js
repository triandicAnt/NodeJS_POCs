var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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

mongoose.model('Business', businessSchema);