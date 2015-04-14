var Gitter = require('node-gitter');
var configuration = require('./configuration');

var token = configuration.access.getToken();

var gitter = new Gitter(token);

exports = module.exports = gitter;
