var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('article',
    { title: 'The Sun'
    });
});

module.exports = router;
