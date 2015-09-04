var express = require('express');
var request = require('request');
var async = require('async');
var aws = require('aws-sdk');
aws.config.region = 'eu-west-1';
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

                var s3 = new aws.S3();
                var comments []

                var params = {
                Bucket: 'codefestb', /* required */
                Prefix: '/articles/' + rec.articleId +'/'
                };
                s3.listObjects(params, function(err, data) {
                  if (err) console.log(err, err.stack); // an error occurred
                  else {

                    for (v in data.contents) {
                      comments.push(v.key)
                    }

                  }


                });

                stories.push({ id: rec.articleId, headline: rec["articleData"]["teaserHeadline"] , comments: comments});
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
