'use strict'
const chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
  response = require('./../../../src/response/response');

describe('response formatter - unit test', function () {

  it('should return the base response', function () {
    let baseResponse = response.base;
    baseResponse.should.be.a('object');
    baseResponse.version.should.equal('1.0');
  });

  it('should return a simple response', function(){
    let simpleResponse = response.simple;
    should.not.exist(simpleResponse.response.card);
  });

  it('should return a response with a simple card', function(){
    let simpleCard = response.simpleCard;
    should.exist(simpleCard.response.card);
    simpleCard.response.card.type.should.equal('Simple');
    should.not.exist(simpleCard.response.card.text);
  });

});
