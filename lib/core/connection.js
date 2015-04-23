var Q = require('q');
var Gitter = require('node-gitter');
var configuration = require('./configuration');

var connectionDefer = Q.defer();

configuration.access.getToken().then(function (token) {
  var gitter = new Gitter(token);
  connectionDefer.resolve(gitter);

}).catch(function (err) {
  connectionDefer.reject(err);
});

exports = module.exports = connectionDefer.promise;
