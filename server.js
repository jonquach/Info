'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./server/index/indexRouter');
// var blackMarket = require('./server/blackMarket/blackMarketRouter');

var mongoose = require('mongoose');
var databaseURI = 'mongodb://localhost/test';
// TODO: need to use process.env.NODE_ENV

mongoose.connect(databaseURI, function (error) {
    if (error) {
        console.log(databaseURI + ' connection error. ', error);
        throw (error);
    } else {
        console.log(databaseURI + ' connected.');
    }
})

var app = express();

// view engine for template
app.set('views', path.join(__dirname, 'server/shared'));
app.set('view engine', 'ejs');

// TODO: Create a favicon
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname) + '/public'));

// Route
// GET index
app.use('/', routes);
// app.use('/blackmarket', blackMarket);

// 404
app.use(function (request, response, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
})

// Error handler

// dev -- default
// if (app.get('env') === 'development') {
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.render('error', {
        message: error.message,
        error: error
    });
});
// }

// prod
// app.use(function(error, request, response, next) {
//     response.status(error.status || 500);
//     response.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

module.exports = app;
