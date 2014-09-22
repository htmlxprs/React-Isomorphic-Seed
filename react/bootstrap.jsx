/**
 * @jsx React.DOM
 */

var React = require('react');
var App=require('./App.jsx');

if(document) {
    React.renderComponent(<App/>, document.getElementById('main'));
}