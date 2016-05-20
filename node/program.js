var fs = require('fs')
var path = require('path');
var content;
var count = undefined;

var myModule = require('./mymodule');
// var file = process.argv[2];

// sync method

// var contents = fs.readFileSync(file, 'utf8');
// console.log(contents.toString().split('\n').length);

// using call back and async
/*
function countNewLines(callback) {
    fs.readFile(file, function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    count = content.toString().split('\n').length;  
     callback(count);
  });
}

function processFile() {
    var array = content.toString().split('\n');
    console.log(array.length);
}
function printCount(){
    console.log(count);
}
countNewLines(printCount);


// readdir
// filte files in a directory by extname

var p = process.argv[2];
var extension = [];
extension.push('.'+process.argv[3]);
// console.log(extension);
// console.log(ext);
fs.readdir(p, function filterExt(err, list){
    if(err){
        console.log(err);
    }
    list.map(function(file){
        return path.join(p,file);
    }).filter(function(file){
        return fs.statSync(file).isFile();
    })
    .filter(function(file){
        var ext = path.extname(file);
        return extension.indexOf(ext) != -1;
    }).forEach(function(file){
        console.log("%s", file);
    });
});

// Using mudules
var p = process.argv[2];
var ext = process.argv[3];

myModule(p,ext,myCallback);

function myCallback(err,list){
    if(err){
        throw err;
    }
    list.forEach(function(file){
        console.log("%s", file);
    });
}

*/