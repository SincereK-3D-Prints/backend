'use strict';

const colors = require('ansi-colors');

const printMethod = (method) => {
  let color = 'blue';
  switch(method) {
    case 'GET':
      color = 'blue';
      break;
    case 'POST':
      color = 'green';
      break;
    case 'DELETE':
      color = 'red';
      break;
    case 'PATCH':
    case 'PUT':
      color = 'yellow';
      break;
    default:
      color = 'blue';
  }

  return colors[color](method + ':');
}

const logUrl = (req, res, next) => {
  try {
    req.realIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const url = req.protocol + '://' + req.hostname + req.url;
    console.log('ip:', req.realIp, '\ncloudflareIP', req.ip, '\n' + printMethod(req.method), url);
  } catch (e) {
    console.log('ip: localhost', '\n' + printMethod(req.method), req.url);
  }

  next();
};

module.exports = logUrl;
