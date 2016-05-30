
module.exports = function (parseJson, callback){

  function httpReqFunc(response){
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
        if(parseJson==='json'){
          resData = JSON.parse(resData);
          callback(null,resData);
        }
      });
  };
  return httpReqFunc;

};
