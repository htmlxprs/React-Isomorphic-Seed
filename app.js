var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url=require('url');
var posts=require('./routes/posts');

require('node-jsx').install({extension:'.jsx'});
var ReactAsync=require('react-async');
var App=require('./react/App.jsx');

var app = express();

//connect to our database
var mongoose = require('mongoose');

var dbName='reactApp';

var connectionString='mongodb://localhost:27017/'+dbName;

mongoose.connect(connectionString,function(){

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/api',posts);

    app.get('*',function(req,res){
        var path = url.parse(req.url).pathname;
        ReactAsync.renderComponentToStringWithAsyncState(App({path:path}),function(err, markup) {
            res.send('<!DOCTYPE html>'+markup);
        });
    });


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
});

module.exports = app;
