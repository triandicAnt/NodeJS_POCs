/*
function takes5Seconds(callback) {
    console.log('Starting 5 second task');
    setTimeout( function() { 
        console.log('Just finshed 5 seconds');
        callback(null, 'five');
    }, 5000);
}   

function takes2Seconds(callback) {
    console.log('Starting 2 second task');
    setTimeout( function() { 
        console.log('Just finshed 2 seconds');
        callback(null, 'two');
    }, 2000); 
}   
*/

/*
graph.get("picture?ids=10209269203314305,10209645133074522,10209917316189163&redirect=false&type=large", function(err, res) {
  console.log(res); 
});
*/

/*
function getGraphData(url, callback){	
	graph.get(url, function(err, res) {

  		postResults.push(res.data);
  		if(res.paging && res.paging.next) {
    		graph.get(res.paging.next, function(err, res) {
    			postResults.push(res.data);
			   callback(null, postResults)	;		
    		});
  		}
	});
}
*/

// fetch data callback method

/*
function fetchData(err,data){
  if(err){
    console.log(err);
  }
  else{
		data.forEach(function(value){
  			value.forEach(function(uid){
  				userIds.push(uid.from.id);
			});
		});
  		var str = getUserIdsString(userIds);
  		getUserDetails(str);
  	}
}



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

function getUserIdsString(array)
{
	var str = "";
	array.forEach(function(value){
		str += "," + value;
	});
	return str.substring(1,str.length);	
}

function getPostData(callback){	
	setTimeout( function() { 
		graph.get(FBConfig.groupUrl, function(err, res) {
  				callback(null, res);
		});
	}, 6000);
}

function getUserData(callback){
	postResults.forEach(function(value){
  			value.forEach(function(uid){
  				userIds.push(uid.from.id);
			});
		});
  	var str = getUserIdsString(userIds);
	var url = "picture?ids=" +str+ "&redirect=false&type=large"
	graph.get(url, function(err, res) {
		userResults.push(res);
		callback(null, res);
	});
}

var async = require('async');
,
    operations = [];

operations.push(getPostData);
operations.push(getUserData);

async.series(operations, function (err, results) {
    console.log(results);
});
*/

var async = require('async'),
    operations = [];

operations.push(takes2Seconds);
operations.push(takes5seconds);

async.series(operations, function (err, results) {
    console.log(results);
});

function takes2Seconds(callback) {
	setTimeout( function() { 
        console.log('Just finshed 2 seconds');
        callback(null, 'two');
    }, 2000);
//     callback(null, '2');
}

function takes5seconds(callback) {
setTimeout( function() { 
        console.log('Just finshed 5 seconds');
        callback(null, 'five');
    }, 5000);
//     callback(null, '5');
}