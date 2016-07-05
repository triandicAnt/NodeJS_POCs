var youtubeAPI = require('youtube-api');

var Youtube = {

    _APIKEY: 'AIzaSyBFmMODzS-d-ksUzCOYm-1fIpkf5KAwkoM',
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