/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync=require('react-async');
var request=require('superagent');


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
            {this.state.post.content}
            </div>
            );
    }
});

module.exports=PostView;