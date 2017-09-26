'use strict'
const chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
  response = require('./../../../src/response/response-creator');

describe('response creator - unit test', function () {

  it('should return the simple response with speech input', function () {
    let output = response.basicSpeech('hello');
    output.response.outputSpeech.type.should.equal('SSML');
    output.response.outputSpeech.ssml.should.equal('<speak>hello</speak>');
    //output.response.reprompt.outputSpeech.ssml.should.equal('<ssml>hello</ssml>');
  });

});
