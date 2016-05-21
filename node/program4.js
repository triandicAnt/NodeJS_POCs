var fs = require('fs')
var path = require('path');
var file = process.argv[2];

function countNewLines(callback) {
    fs.readFile(file, function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    count = content.toString().split('\n').length;  
     printCount(count);
  });
}
function printCount(){
    console.log(count-1);
}
countNewLines(printCount);