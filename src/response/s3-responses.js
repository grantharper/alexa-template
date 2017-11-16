var aws = require('aws-sdk'),
  info = require('./../../aws'),
  buff = require('buffer');

var s3 = new aws.S3();

module.exports.retrieveFromS3 = function(callback){
  var params = {
    Bucket: info.bucketName,
    Key: 'tricks.json'
  };
  
  s3.getObject(params, function(err, data){
    if(err){
      console.error(err);
      return callback(err);
    }else{
      console.log(data);
      const buf = Buffer.from(data.Body);
      const json = buf.toString('utf8');
      console.log(json);
      var responses = JSON.parse(json);
      return callback(null, responses);
    }
  
  });
}