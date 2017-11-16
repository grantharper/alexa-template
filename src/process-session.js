'use strict'
const aws = require('aws-sdk'),
  database = require('./database'),
  info = require('./../aws');


//endpoint: "http://localhost:8000"

module.exports.getDocClient = function () {
  return database.docClient;
}

module.exports.getSession = function (event, callback) {

  if (event.session.new) {
    //get from dynamoDB
    this.getDocClient().get({
      TableName: info.sessionTableName,
      Key: {
        userId: event.session.user.userId
      }
    }, function (err, output) {
      if (err) {
        console.error(err);
        return callback(err);
      } else {
        console.log(output);
        if (output.Item && output.Item.attributes) {
          event.session.attributes = output.Item.attributes;
        } else {
          event.session.attributes = {};
        }

        return callback(null, event);
      }
    });
  } else {
    return callback(null);
  }
}

module.exports.putSession = function (event, response, callback) {

  if (response.response.shouldEndSession) {
    //save to dynamoDB
    database.docClient.put({
      TableName: info.sessionTableName,
      Item: {
        userId: event.session.user.userId,
        attributes: response.sessionAttributes,
        timestamp: new Date().toLocaleString()
      }
    }, function (err, output) {
      if (err) {
        console.error(err);
        return callback(err);
      } else {
        console.log(output);
        return callback(null, true);
      }
    });
  } else {
    return callback(null);
  }
}