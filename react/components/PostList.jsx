/**
 * @jsx React.DOM
 */

var React = require('react');
var request=require('superagent');
var ReactAsync=require('react-async');
var Link=require('react-router-component').Link;

var Post = React.createClass({

    render: function() {
        var post=this.props.post;
        var url='/post/'+post._id;
        return (
            <div className="postBox">
                <span><Link href={url}>{post.title}</Link></span>
            </div>
            )
    }
});

var PostList = React.createClass({
    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function(cb) {
        request.get('http://localhost:8000/api/posts', function(response) {
            cb(null, {posts:response.body});
        });
    },

    render: function() {
        var postNodes = this.state.posts.map(function (post) {
          return (
            <Post key={post._id} post={post}></Post>
          );
        });
        return (
          <div className="postList">
            {postNodes}
          </div>
        );
    }
});

module.exports=PostList;