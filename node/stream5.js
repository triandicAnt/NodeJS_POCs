var through = require('through2');
var count = 1;
function autoIncrement(){
    return count+1;
}    
/*
var split = require('split');
    process.stdin
        .pipe(split())
        .pipe(through2(function (line, _, next) {  
            if(count%2==0){
                console.dir(line.toString().toUpperCase());
            }
            else //if(line.toString().length >1)
                {
                console.dir(line.toString().toLowerCase());                
            }
            count++;
            next();
        }))
    ;

*/
