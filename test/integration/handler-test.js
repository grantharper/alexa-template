'use strict'
const chai = require('chai'),
  should = chai.should(),
  handler = require('./../../handler'),
  sinon = require('sinon'),
  main = require('./../../src/main'),
  event = require('./../request/request-base'),
  mockCredentials = require('./../mock-credentials');

describe('handler', function(){
  it('should response to any event with the correct applicationId', function(){
    var credsStub = sinon.stub(main, 'retrieveCredentials').callsFake(function(){
      return mockCredentials.applicationId;
    });
    handler.hello(event, null, function(err, response){
      should.not.exist(err);
      should.exist(response);
      response.response.outputSpeech.ssml.should.be.a('string');
    });
    credsStub.restore();
  })
});

function retrieveMockCredentials(){
  return mockCredentials.applicationId;
}