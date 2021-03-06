module.exports = function(req, res, next) {
	var request = require('request');
	var async = require('async');
	var aws = require('aws-sdk');
	aws.config.region = 'eu-west-1';
  	aws.config.sslEnabled = false;

	var storyId = req.params.id
	for (i in req.params) {
		console.log(i)
	}
	var userId = "dave"
	var s3 = new aws.S3();
	var params = {Bucket: 'codefestb', Key: 'articles/'+storyId+'/'+userId, Expires: 600 };
	s3.getSignedUrl('putObject', params, function (err, url) {
	  console.log("The URL is", url);
	  res.render('create', { title: 'The Sun', submitPath: url});
	});
};
