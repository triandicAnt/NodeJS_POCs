var express = require('express');
var route = express.Route();

// post api
router.route('/posts')
    .post(function (req, res) {
        req.send({message : "create a new Post in DB"});
    })
    .get(function (req, res) {
        req.send({message:"get all posts in DB"});
    })
    
module.exports = router;