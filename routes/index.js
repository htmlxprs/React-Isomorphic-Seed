require('node-jsx').install();
var express = require('express');
var url= require('url');
var router = express.Router();
var fs=require('fs');
var React=require('react');
var ReactAsync=require('react-async');
var App=require('../react/App.jsx');

router.get('*',function(req,res){
   var path = url.parse(req.url).pathname;
   ReactAsync.renderComponentToStringWithAsyncState(App({path:path}),function(err, markup) {
        res.send('<!DOCTYPE html>'+markup);
   });
});

module.exports = router;