// readdir
// filte files in a directory by extname
var fs = require('fs')
var path = require('path');
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
        console.log("%s", path.basename(file));
    });
});