'use strict';

const main = require('./src/main');

module.exports.hello = (event, context, callback) => {

  main.execute(event, function (err, response) {
    callback(err, response);

  });
};
