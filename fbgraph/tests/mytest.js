var graph    = require("../index")
  , FBConfig = require("./config").facebook;

graph.setAppSecret(FBConfig.appSecret)
graph.setAccessToken(FBConfig.accessToken)
graph.setVersion("2.6");

/*
graph.get("picture?ids=10209269203314305,10209645133074522,10209917316189163&redirect=false&type=large", function(err, res) {
  console.log(res); 
});
*/
function getDateTime() {

	var date = new Date();

	date.setDate(date.getDate() - 15);
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day;

}
function getGraphData(url, callback){	
	graph.get(url, function(err, res) {

  		results.push(res.data);
  		//console.log(res.paging.next);
  		if(res.paging && res.paging.next) {
    		graph.get(res.paging.next, function(err, res) {
    			results.push(res.data);
			   callback(null, results)	;		
    		});
  		}
	});
}
var results = [];
var i = 0; //
var date = getDateTime();
var groupUrl = "197403893710757/feed?fields=created_time,updated_time,from,shares,story,link, id, message, name,place,attachments&limit=50";
// fetch data callback method
function fetchData(err,data){
  if(err){
    console.log(err);
  }
  else{
  		console.log(data);
  		console.log('now calling other function');
  	}
}

getGraphData(groupUrl,fetchData);

