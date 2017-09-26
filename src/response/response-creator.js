'use strict'

const templates = require('./response');

module.exports.basicSpeech = function(speech){
  let output = templates.simple;
  output.response.outputSpeech.type = 'SSML';
  output.response.outputSpeech.ssml = '<speak>' + speech + '</speak>';
  delete output.response.reprompt;
  return output;
}