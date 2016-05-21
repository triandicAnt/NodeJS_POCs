var fs = require('fs')
var path = require('path');

var http = require('http');
var bl = require('bl');
var net = require('net');
var map = require('through2-map');

/*
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



// HTTP request and response
var array = [];
function getDataFromUrl(url){
    http.get(url,function callback(response){
        response.on("error", function(data){
            console.log("Something bad happened");
        });
        /*response.on("data", function(data){
            console.log('1');
            array.push(data.toString());
            // var array = data.toString().split('\n');
            // array.forEach(function(line){
            // console.log(line);
            });
       
        response.on("end", function(error){
            if(error){
                throw error;
            }
            console.log('2');
            // console.log(array);
            var completeString = '';
            array.forEach(function(line){
                console.log(line);
                completeString.concat(line);
            });
            // for (s in array){
            //     console.log(s);
            //     // completeString+=s;
            // }
            // console.log(completeString.length);
            console.log(completeString);
        
        });
        response.pipe(bl(function (err, data) {
            if(err){
                throw err;
            }
             console.log(data.toString().length);
              console.log(data.toString());
            }));
    });
};
var url = process.argv[2];
// var url = 'http://www.google.com/index.html';

 getDataFromUrl(url);

var content = [];
var counter = 3;
for (var i = 0; i < 3; i++ ) {
    (function(index) {
        http.get(process.argv[index + 2], function(response) {
            response.pipe(bl(function (err, data) {
                if (err) throw err;

                content[index] = data.toString();
                counter --;
                if (counter === 0) {
                    console.log(content[0]);
                    console.log(content[1]);
                    console.log(content[2]);
                }
            }));
        });
    })(i); 
}


//TCP Connection

function createTCPConnection(port){
    var server = net.createServer(function listener(socket){
        var date = new Date();
        var strftime = require('strftime')
        socket.write(strftime('%F %R', date));
        socket.write('\n');
        socket.end();
    });
    server.listen(port);
};
var port = process.argv[2];
createTCPConnection(port);


// HTTP server

function createHttpServer(port, filename){
   var server =  http.createServer(function callback(req,res){
        res.writeHead(200, { 'content-type': 'text/plain' })
        fs.createReadStream(filename).pipe(res);
    });
    server.listen(port);
};
var port = process.argv[2];
var filename = process.argv[3];
createHttpServer(port,filename);

Write an HTTP server that receives only POST requests and converts  
incoming POST body characters to upper-case and returns it to the client.


function createHttpServer(port){
   var server =  http.createServer(function callback(req,res){
        if (req.method == 'POST') {
            res.writeHead(200, { 'content-type': 'text/plain' });
            req.pipe(map(function (chunk) {  
                return chunk.toString().toUpperCase().split('').join('')  
            })).pipe(res)
        }
       
    });
    server.listen(port);
};
var port = process.argv[2];
createHttpServer(port);

*/
var url = require('url');
var port = process.argv[2];
var server =  http.createServer(function callback(req,res){
    if (req.method == 'GET') {
            var parsedUrl = url.parse(req.url, true);
            var parseTime = '/api/parsetime';
            var unixTime = '/api/unixtime';
            if (parsedUrl.pathname === parseTime) {
                var query = parsedUrl.query;
                var date1 = new Date(query.iso);
                var unixTimePayload = {
                     "hour": date1.getHours(),  
                     "minute": date1.getMinutes(),  
                     "second": date1.getSeconds()  
                };
                
                res.end(JSON.stringify(unixTimePayload));
            } else if (parsedUrl.pathname === unixTime) {
                    var query = parsedUrl.query;
                var date1 = new Date(query.iso);
                var unixTimeValue = {
                     "unixtime": date1.getTime()
                };    
                res.end(JSON.stringify(unixTimeValue));         
            }           
    }
});
server.listen(port);