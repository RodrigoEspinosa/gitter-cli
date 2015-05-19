var Q = require('q');
var Gitter = require('node-gitter');
var configuration = require('./configuration');

var getTokenAndConnect = function () {
  var connectionDefer = Q.defer();

  configuration.access.getToken().then(function (token) {
    var gitter = new Gitter(token);

    gitter.reload = getTokenAndConnect;

    connectionDefer.resolve(gitter);

  }).catch(function (err) {
    connectionDefer.reject(err);
  });

  return connectionDefer.promise;
};

exports = module.exports = getTokenAndConnect();
