'use strict'

const aws = require('aws-sdk'),
  docClient = new aws.DynamoDB.DocumentClient(),
  credentials = require('./credentials'),
  processRequest = require('./process-request'),
  processSession = require('./process-session');

module.exports.execute = function (event, callback) {
  let applicationId = this.retrieveCredentials();
  //verify application id
  if (event.session.application.applicationId !== applicationId) {
    return callback(new Error('invalid applicationId'));
  }

  processSession.getSession(event, function (err, updatedEvent) {
    if (err) {
      console.error(err);
      return callback(err);
    } else {
      if (updatedEvent) {
        event = updatedEvent;
      }
      processRequest.process(event, function (err, response) {
        if (err) {
          return callback(err);
        } else {

          processSession.putSession(event, response, function (err, output) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, response);
            }
          });

        }
      });
    }
  });

}

module.exports.retrieveCredentials = function () {
  return credentials.applicationId;
}