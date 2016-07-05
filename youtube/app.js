var youtubeAPI = require("youtube-api")
  , YConfig = require("./config").youtube
  , FireConfig = require("./config").fbase;
  
var async = require('async');
var firebase = require('firebase');

firebase.initializeApp({
serviceAccount: {
    projectId:   FireConfig.projectId,
    clientEmail: FireConfig.clientEmail,
    privateKey:  FireConfig.privateKey
  },
  databaseURL: FireConfig.kDBBaseRef
});

var db = firebase.database();


var postResults = [];
var userResults = [];
var postDict = {};
var imageDict = {};
var userArray = [];

var postKeys = ["id", "title","url", "thumbnail", "createdDate"];
	console.log(YConfig.API);

var Youtube = {
    _APIKEY: YConfig.API,
      setup: function (apiKEY) {
        this._APIKEY = apiKEY;
        youtubeAPI.authenticate({
            type: 'key',
            key: apiKEY
        });
    },
    searchFunctions: require('./lib/search-functions'),
};

function getYoutubeData(){
   async.waterfall([
    	function(callback){
    		Youtube.searchFunctions.simpleSearch('trailers').then(function (data) {
    		console.log(data);
    		callback(null, data);
		});
    },
    function(arg1, callback){
		callback(null,arg1);
    }
  ], function (err, result) {
  		if(err != null){
    	}
  });
}

function createLog(msg){
	var startTime = firebase.database.ServerValue.TIMESTAMP;
	log = {};
	log['msg'] = msg;
	log['time'] = startTime;
	return log;
}
/*
function saveData(result){
	postResults = result[0];
	userResults = result[1];
	postResults.forEach(function(json){
		var post = {};
		var postValue = [];

		var pId = json.id;
// 		var pName = json.name;
		var pUrl = json.link;
		var pMessage = json.message;
		var pCreatedTime = Date.parse(json.created_time)/1000;
		var pUpdatedTime = Date.parse(json.updated_time)/1000;
		var priceAndLoc = getPriceAndLocAndName(pMessage);
		var pPrice = priceAndLoc[1];
		var pLoc = priceAndLoc[2];
		var pName = priceAndLoc[0];
		var uId = json.from.id;
		var uName = json.from.name;

		var imgIdAndSrcArray = getImageIdAndUrl(json);
		var imgSrcArray = imgIdAndSrcArray[1];
		var pImages = {};
		imgIdAndSrcArray[0].forEach(function (imgId){
			pImages[imgId] = true;
		});
		var users = {};
		var userValues = [];
		userValues.push(uId);
		userValues.push(uName);
		userValues.push(pId);
		userValues.push(userResults[uId].data.url);
		for(var i=0; i<userKeys.length;i++){
			users[userKeys[i]] = userValues[i];
		}
		postValue.push(users);
		postValue.push(pName);
		postValue.push(pMessage);
		postValue.push(pUrl);
		postValue.push(pUpdatedTime);
		postValue.push(pCreatedTime);
		postValue.push(pPrice);
		postValue.push(pLoc);
		postValue.push(pImages);

		for(var i=0; i<postKeys.length;i++){
			if(typeof postValue[i] == 'undefined'){
				post[postKeys[i]] = '';
			}
			else{
				post[postKeys[i]] = postValue[i];
			}
		}
		postDict[pId] = post;

		// creating user records
		/*var users = {};
		var userValues = [];
		userValues.push(uId);
		userValues.push(uName);
		userValues.push(pId);
		userValues.push(userResults[uId].data.url);
		for(var i=0; i<userKeys.length;i++){
			users[userKeys[i]] = userValues[i];
		}
		userArray.push(users);
		*/
		// creating image record
// 		for(var i=0; i<imgIdAndSrcArray[0].length;i++){

/*		var c = 0;
		imgIdAndSrcArray[0].forEach(function (imgId){
			var image = {};
			var imageValue = [];
// 			imageValue.push(imgId);
			imageValue.push(imgSrcArray[c]);
			imageValue.push(uId);
			imageValue.push(pId);
			for(var i=0; i<imageKeys.length;i++){
				image[imageKeys[i]] = imageValue[i];
			}
			c = c+1;
			imageDict[imgId] = image;
		});

	});
*/
	// saving data to firebase
/*
	async.series
    ([
        function (callback)
        {
        	saveToDatabaseWithRef(FireConfig.kDBPostRef,postDict);
            callback();
        }
        ,
        function (callback)
        {
        	saveToDatabaseWithRef(FireConfig.kDBImageRef,imageDict);
            callback();
        }
        ,
        function (callback)
        {
        	saveUserAndImages(FireConfig.kDBImageRef,imageArray);
            callback();
        }
    ]
    ,
    function(err)
    {
    	if(err != null){
    		saveLogs(FireConfig.kDBLogRef,createLog(err));
    	}
		saveLogs(FireConfig.kDBLogRef,createLog('saving data'));
        console.log("Done !");
    });
}

*/
var onComplete = function(error) {
  if (error) {
    if(error != null){
    		saveLogs(FireConfig.kDBLogRef,createLog(error));
    	}
  } else {
    console.log('Synchronization succeeded');
    process.exit();
  }
};
function saveToDatabaseWithRef(childRef, data){
	var postRef = db.ref(childRef);
	postRef.update(data);
// 	postRef.update(data,onComplete);

}

function saveLogs(childRef, data){
	var postRef = db.ref(childRef);
// 	data.forEach(function (value){
		postRef.push().set(data);
// 	});
// 	postRef.push().update(data,onComplete);
}


// reading data from database
// function readDataFromChild(childRef){
// 	var ref = db.ref(childRef);
// 	ref.on("value", function(snapshot) {
//   		console.log(snapshot.val());
// 	}, function (errorObject) {
//   	console.log("The read failed: " + errorObject.code);
// 	});
// }

getYoutubeData();
