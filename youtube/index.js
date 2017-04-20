var youtubeAPI = require('youtube-api');

var Youtube = {

    _APIKEY: '***API Key***',
      setup: function (apiKEY) {
        this._APIKEY = apiKEY;
        youtubeAPI.authenticate({
            type: 'key',
            key: apiKEY
        });
    },
    searchFunctions: require('./lib/search-functions'),
};

module.exports = Youtube;
