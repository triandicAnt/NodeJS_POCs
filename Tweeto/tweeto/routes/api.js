var express = require('express');
var router = express.Router();

// post api
router.route('/posts')
    .post(function (req, res) {
        req.send({message : "create a new Post in DB"});
    })
    .get(function (req, res) {
        req.send({message:"get all posts in DB"});
    })
    
router.route('/posts/:id')

    //create
    .put(function(req,res){
        return res.send({message:'modify an existing post by using param ' + req.param.id});
    })

    .get(function(req,res){
        return res.send({message:'get an existing post by using param ' + req.param.id});
    })

    .delete(function(req,res){
        return res.send({message:'delete an existing post by using param ' + req.param.id})
    });
    
    
module.exports = router;