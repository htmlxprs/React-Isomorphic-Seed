require('node-jsx').install();
var express = require('express');
var url= require('url');
var router = express.Router();
var fs=require('fs');
var React=require('React');
var ReactAsync=require('react-async');
var App=require('../react/App.jsx');
var TEMPLATE=fs.readFileSync('./views/react/index.html').toString();
var PLACEHOLDER='<div id="main"></div>';

router.get('*',function(req,res){
   var path = url.parse(req.url).pathname;
   ReactAsync.renderComponentToStringWithAsyncState(App({path:path}),function(err, markup) {
        res.send(TEMPLATE.replace(PLACEHOLDER, '<div id="main">'+markup+'</div>'));
   });
});

module.exports = router;