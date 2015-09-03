module.exports = function(req, res, next) {
	var request = require('request');
	var async = require('async');
	var aws = require('aws-sdk');
	aws.config.region = 'eu-west-1'

	var storyId = req.params.id
	for (i in req.params) {
		console.log(i)
	}
	var userId = "dave"
	var s3 = new aws.S3();
	var params = {Bucket: 'codefestb', Key: 'articles/'+storyId+'/'+userId };
	var submitUrl
	s3.getSignedUrl('putObject', params, function (err, url) {
	  console.log("The URL is", url);
	  submitUrl = url
	});
	
	res.render('create', { title: 'The Sun', submitPath: submitUrl});
};