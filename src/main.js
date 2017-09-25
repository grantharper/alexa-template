'use strict'

const credentials = require('./credentials'),
  responseBase = require('./response-base');

module.exports.execute = function (event, callback) {
  let applicationId = this.retrieveCredentials();
  //verify application id
  if (event.session.application.applicationId !== applicationId) {
    callback(new Error('invalid applicationId'));
  }

  let response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Hello and welcome to the alexa template',
      },
      shouldEndSession: true,
    },
  };

  return callback(null, response);

}

module.exports.retrieveCredentials = function (){
  return credentials.applicationId;
}