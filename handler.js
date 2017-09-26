'use strict';

const main = require('./src/main');

module.exports.hello = (event, context, callback) => {

  main.execute(event, function (err, response) {
    if(err) console.log(err);
    callback(err, response);

  });
};
