'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'INFO' });
});

router.get('/profile', function(req, res) {
    res.render('index', { title: 'INFO' });
});

module.exports = router;
