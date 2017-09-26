'use strict'

const credentials = require('./credentials'),
  responseCreator = require('./response/response-creator');

module.exports.execute = function (event, callback) {
  let applicationId = this.retrieveCredentials();
  //verify application id
  if (event.session.application.applicationId !== applicationId) {
    return callback(new Error('invalid applicationId'));
  }
  let response = responseCreator.basicSpeech('Hello, I want to tell you a secret.<amazon:effect name="whispered">I am not a human.</amazon:effect>');

  return callback(null, response);

}

module.exports.retrieveCredentials = function (){
  return credentials.applicationId;
}