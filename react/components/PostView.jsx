/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync=require('react-async');
var request=require('superagent');
var Link=require('react-router-component').Link;

var PostView = React.createClass({
    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function(cb) {
        var id=this.props.id;
        request.get('http://localhost:8000/api/posts/'+id, function(response) {
            cb(null, {post:response.body});
        });
    },
    render: function() {
        return (
            <div className="singlePost">
              <Link href="/">&lt;--</Link>
              <p>{this.state.post.content}</p>
            </div>
            );
    }
});

module.exports=PostView;
