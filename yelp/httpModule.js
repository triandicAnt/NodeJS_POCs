
module.exports = function (parseJson, callback){
  return function(response){
    var resData = "";
    response.on("error", function(data){
        console.log("Something bad happened");
        callback(err);
    });
    response.on("data", function(data){
      resData= resData+data;
    });
    response.on("end", function(error){
        if(error){
            throw error;
        }
        if(parseJson){
          resData = JSON.parse(resData);
          callback(null,resData);
        }
      });
  };

};
