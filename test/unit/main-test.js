'use strict'
const chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
  main = require('./../../src/main'),
  event = require('./../request/request-base'),
  mockCredentials = require('./../mock-credentials');


describe('main - unit test', function () {
  it('should respond to requests', function(){
    sinon.stub(main, 'retrieveCredentials').callsFake(function(){
      return mockCredentials.applicationId;
    });
    main.execute(event, function(err, response){
      should.exist(response);
      response.response.outputSpeech.text.should.equal('Hello and welcome to the alexa template');
    });
  });
});

function retrieveMockCredentials(){
  return mockCredentials.applicationId;
}