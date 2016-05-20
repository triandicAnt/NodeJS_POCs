var test = require('blue-tape');
var merge = require('merge');
var yelp = require('../');

var options = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
};

var parameters = {
  term: 'food',
  location: 'Montreal',
};

test('yelp search', (t) => {
  t.plan(4);
  yelp.search(merge(options, parameters), (err, response, body) => {
    // console.log(response);
    // console.log(body);
    t.error(err);
    var info = JSON.parse(body);
    t.equal(typeof info.region, 'object');
    t.equal(typeof info.total, 'number');
    t.ok(Array.isArray(info.businesses), 'businesses is array');
  });
});