var graph    = require("../index")
  , FBConfig = require("./config").facebook;

graph.setAppSecret(FBConfig.appSecret)
graph.setAccessToken(FBConfig.accessToken)
graph.setVersion("2.6");


var postResults = [];
var userResults = [];

var async = require('async');

async.waterfall([
    function(callback){
    	graph.get(FBConfig.groupUrl, function(err, res) {
  				callback(null, res.data);
		});
    },
    function(arg1, callback){
    	var userIds = [];
    	var str = "";
        arg1.forEach(function(value){
  				userIds.push(value.from.id);
  				str += "," + value.from.id;
		});
		str = str.substring(1,str.length);
		var url = "picture?ids=" +str+ "&redirect=false&type=large";
		graph.get(url, function(err, res) {
			userResults.push(res);
			var results = [];
			results.push(arg1);
			results.push(res);
			callback(null,results);
		});
    }
], function (err, result) {
   console.log(result[1]);   
});