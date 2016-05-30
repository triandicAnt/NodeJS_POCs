
module.exports = function (parseJson, callback){

  function httpReqFunc(response){
     var resData = ""; // string in which all data will be concatenated
     // incase of error, send it back to callback
    response.on("error", function(data){
        console.log("Something bad happened");
        callback(err); // sending error to callback
    });
    // id its of data tyoe, append it to to 'resData'
    response.on("data", function(data){
      resData= resData + data;
    });
    // in end send accumulated data to callback
    response.on("end", function(error){
        if(error){
            throw error;
        }
        // check for JSON type
        if(parseJson==='json'){
          resData = JSON.parse(resData);
          callback(null,resData);
        }
      });
  };
  // return the function (closure)
  return httpReqFunc;

};
