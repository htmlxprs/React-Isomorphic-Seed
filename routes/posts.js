/**
 * Created by Sandeep on 27/09/14.
 */

var Post=require('../models/post');
var express=require('express');
var router=express.Router();

//Let's add a few sample posts.

var postsArr=[
    {
        "title": "What is Lorem Ipsum",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        "title": "Why use Lorem Ipsum",
        "content": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        "title": "Sample Lorem Ipsum",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget pellentesque neque, ac pellentesque elit. Integer at nisi non elit vulputate feugiat. Proin finibus tortor in felis lacinia luctus. Donec at venenatis augue. Sed vulputate hendrerit feugiat. Praesent semper ex a nulla viverra, ac finibus diam dapibus. In vel lacinia nulla, in hendrerit nisl. Morbi ac metus metus."
    }
]

Post.find(function(err,posts){
    if(posts && posts.length===0){
        for(var i=0;i<postsArr.length;i++){
            var postInstance=new Post(postsArr[i]);
            postInstance.save();
        }
    }
});

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
