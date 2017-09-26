'use strict'
const baseResponse = require('./response-base');

function getResponseCopy(){
  return JSON.parse(JSON.stringify(baseResponse));
}

module.exports.base = (function(){
  let output = getResponseCopy();
  return output;
})();

module.exports.simple = (function(){
  let output = getResponseCopy();
  delete output.response.card;
  return output;
})();

module.exports.simpleCard = (function(){
  let output = getResponseCopy();
  output.response.card.type = 'Simple';
  delete output.response.card.text;
  delete output.response.card.image;
  return output;
})();


