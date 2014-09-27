/**
 * Created by Sandeep on 27/09/14.
 */

var Post=require('../models/post');
var express=require('express');
var router=express.Router();

router.route('/posts')
    .get(function(req,res){
        Post.find(function(err,posts){
            if(err)
                res.send(err);
            res.json(posts);
        });
    })

    .post(function(req,res){
        var post=new Post(req.body);
        post.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Post Added'});
        });
    });

router.route('/posts/:id')
    .put(function(req,res){
        Post.findOne({_id:req.params.id}).exec(function(err,post){

            if(err)
                res.send(err);

            for(prop in req.body){
                post[prop]=req.body[prop];
            }

            // save the Post
            post.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        });
    })

    .get(function(req,res){
        Post.findOne({_id:req.params.id}).exec(function(err, post) {
            if(err)
                res.send(err);

            res.json(post);
        });
    })

    .delete(function(req,res){
        Post.remove({
            _id: req.params.id
        }, function(err, post) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports=router;
