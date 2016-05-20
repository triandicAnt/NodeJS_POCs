Node.js module for interacting with Yelp's API v2.0

# Usage

```javascript
// Request API access: http://www.yelp.com/developers/getting_started/api_access
var merge = require('merge');
var yelp = require('node-yelp-api');

var options = {
  consumer_key: 'consumer-key',
  consumer_secret: 'consumer-secret',
  token: 'token',
  token_secret: 'token-secret',
};

// See http://www.yelp.com/developers/documentation/v2/search_api
var parameters = {
  term: 'food',
  location: 'Montreal',
};
yelp.search(merge(options, parameters), (data) => {
  console.log(data);
}, (err) => {
  console.error(err);
});
```

See [./tests](./tests) for more usage examples.

# References

- [Search API](http://www.yelp.com/developers/documentation/v2/search_api)

# Test

```bash
CONSUMER_KEY="" CONSUMER_SECRET="" TOKEN="" TOKEN_SECRET="" npm test
```

# Thanks:
- https://arian.io/how-to-use-yelps-api-with-node/
- https://github.com/olalonde/node-yelp
