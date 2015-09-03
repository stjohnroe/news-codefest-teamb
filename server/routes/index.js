var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();

router.get('/', function(req, res, next) {

    async.parallel([
      function (callback) {
          request('http://www.thesun.co.uk/web/thesun/sol/homepage/', function (err, res, body) {
            var processed = JSON.parse(body);
            var stories = [];
            processed.articleTeasers.forEach(function(rec) {
              if (rec.articleData) {
                console.log("ouput from ",rec.articleId);
                for (p in rec) {
                  console.log(p, typeof(rec[p]));
                  console.log(rec[p]);
                }
                stories.push({ id: rec.articleId, headline: rec["articleData"]["teaserHeadline"] });
            }
            })
            callback(stories);
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
