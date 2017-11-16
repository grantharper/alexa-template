const AWS = require('aws-sdk');
// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "http://localhost:8000"
// });
AWS.config.update({
  region: "us-east-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.docClient = docClient;





// AWS.config.endpoint = 'http://localhost:8000';

// const testDocClient = new AWS.DynamoDB.DocumentClient();

// module.exports.testDocClient = testDocClient; 