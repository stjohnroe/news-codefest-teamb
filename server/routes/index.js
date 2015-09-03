var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();

router.get('/', function(req, res, next) {

    async.parallel([
      function (callback) {
          request('http://www.thesun.co.uk/web/thesun/sol/homepage/', function (err, res, body) {
            var body = JSON.parse(body);
            callback(body.articleTeasers);
          })
      },

      ], function (results) {
        res.render('index',
          { title: 'The Sun',
            stories: results
          });
      });

});

module.exports = router;
