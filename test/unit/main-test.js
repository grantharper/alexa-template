'use strict'
const chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
  main = require('./../../src/main'),
  event = require('./../request/request-base'),
  mockCredentials = require('./../mock-credentials');


describe('main - unit test', function () {
  it('should respond to requests', function(){
    var credsStub = sinon.stub(main, 'retrieveCredentials').callsFake(function(){
      return mockCredentials.applicationId;
    });
    main.execute(event, function(err, response){
      should.not.exist(err);
      should.exist(response);
      response.response.outputSpeech.text.should.equal('Hello and welcome to the alexa template');
    });
    credsStub.restore();
  });

  it('should reject requests with an incorrect applicationId', function(){
    var credsStub = sinon.stub(main, 'retrieveCredentials').callsFake(function(){
      return "incorrect";
    });
    main.execute(event, function(err, response){
      should.exist(err);
      should.not.exist(response);
      err.message.should.equal('invalid applicationId');
    });
    credsStub.restore();
  });
});

function retrieveMockCredentials(){
  return mockCredentials.applicationId;
}