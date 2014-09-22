/**
 * @jsx React.DOM
 */

var React = require('react');
var Locations=require('react-router-component').Locations;
var Location=require('react-router-component').Location;
var PostList = require('./components/PostList.jsx');
var PostView = require('./components/PostView.jsx');

var App = React.createClass({
    render: function() {
        return (
            <Locations path={this.props.path}>
                <Location path="/" handler={PostList} />
                <Location path="/post/:id" handler={PostView} />
            </Locations>
        )
    }
});

module.exports=App;