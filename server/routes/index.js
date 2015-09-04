var express = require('express');
var request = require('request');
var async = require('async');
var aws = require('aws-sdk');
aws.config.region = 'eu-west-1';
var router = express.Router();

router.get('/', function(req, res, next) {

    async.waterfall([
      function (callback) {
          request('http://www.thesun.co.uk/web/thesun/sol/homepage/', function (err, res, body) {
            var processed = JSON.parse(body);
            var stories = [];
            processed.articleTeasers.forEach(function(rec) {
              if (rec.articleData) {                
                stories.push({ id: rec.articleId, headline: rec["articleData"]["teaserHeadline"]});
              }
            })
            callback(null, stories);
          })
      },

      function (stories, callback) {
        var count = stories.length;
        var index = 0;

        async.forEachOf(stories, function (story) {

          var s3 = new aws.S3();
          var comments = [];
          var params = {
            Bucket: 'codefestb',
            Prefix: "articles/" + story.id
          };

          s3.listObjects(params, function(err, data) {
            if (err) { 
              console.log(err, err.stack);
            } else {
              if (data.Contents) {
                data.Contents.forEach(function (v) {
                  comments.push(v.Key);
                });
              }
            }
            index++;
            if (index >= count) {
              callback(null, stories, stories);
            }
          });
          story.comments = comments;
        });
      }

      ], function (err, results, results2) {
        res.render('index',
          { title: 'The Sun',
            stories: results2
          });
      });

});

module.exports = router;
