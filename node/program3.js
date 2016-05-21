var fs = require('fs')
var path = require('path');
var file = process.argv[2];

// sync method

var contents = fs.readFileSync(file, 'utf8');
console.log(contents.toString().split('\n').length-1);
