var fs = require('fs')
var path = require('path');
var filteredList = undefined;
module.exports = function readDirectory(p,extname, callback){
    var extension = [];
    extension.push('.'+extname);
    fs.readdir(p, function filterExt(err, list){
    if (err) {
        return callback(err);
    }
    filteredList = list.map(function(file){
            return path.join(p,file);
        }).filter(function(file){
            return fs.statSync(file).isFile();
        })
        .filter(function(file){
            var ext = path.extname(file);
            return extension.indexOf(ext) != -1;
        }).map(function(file){
            return path.basename(file);
        });
    callback(null,filteredList);
  });
}


// countNewLines(printCount);
