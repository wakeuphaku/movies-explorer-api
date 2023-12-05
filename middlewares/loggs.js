const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLoggs = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

module.exports.errorLoggs = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});
