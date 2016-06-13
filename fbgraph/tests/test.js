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