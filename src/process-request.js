'use strict'

const responseCreator = require('./response/response-creator'),
  s3responses = require('./response/s3-responses');


module.exports.process = function(event, callback){
  console.log(event);
  let response;
  s3responses.retrieveFromS3(function(err, responses){
    if(event.session.attributes && event.session.attributes.sessionTemplate){

      if(event.request.type == 'IntentRequest'){
        
        if(event.request.intent.name == 'AMAZON.NextIntent'){
          event.session.attributes.sessionTemplate.counter++;
        }else if(event.request.intent.name == 'AMAZON.RepeatIntent'){
          //do nothing
        }else if(event.request.intent.name == 'AMAZON.PreviousIntent'){
          event.session.attributes.sessionTemplate.counter--;
        }

      }

      if(event.session.attributes.sessionTemplate.counter >= responses.length 
        || event.session.attributes.sessionTemplate.counter < 0){
        event.session.attributes.sessionTemplate.counter = 0;
      }

      response = responseCreator.basicSpeech(responses[event.session.attributes.sessionTemplate.counter]);

    } else{
      response = responseCreator.basicSpeech(responses[0]);
      event.session.attributes.sessionTemplate = {};
      event.session.attributes.sessionTemplate.counter = 1;
    }
     
    response.sessionAttributes = event.session.attributes;
  
    //response = responseCreator.basicSpeech('<prosody pitch="high">dammit</prosody>,<phoneme alphabet="ipa" ph="fʌk">lame</phoneme>that<phoneme alphabet="ipa" ph="ʃɪt">stupid</phoneme>');
  
    callback(null, response);
  });
  
}

var responses = [
  'My name is Alexa. I want to tell you a secret <amazon:effect name="whispered">I am always listening to you and I know more than you think</amazon:effect>',
  '<prosody pitch="high">dammit</prosody>,<phoneme alphabet="ipa" ph="fʌk">lame</phoneme>that<phoneme alphabet="ipa" ph="ʃɪt">stupid</phoneme>'
];