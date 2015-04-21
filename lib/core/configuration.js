var Fs = require('fs');
var Q = require('q');
var Keychain = require('keychain');

var Configuration = {
  secretFileLocation: './secrets.json',
  token: null,
  access: {
    getToken: function (callback) {
      if (token !== null) {
        return token;
      }

      var deferred = Q.defer();

      Fs.readFile(secretsFileLocation, function (err, res) {
        if (err) deferred.reject(err);

        console.log(res);
        var data = JSON.parse(res);

        token = data['authentication-token'];
      });

      // return require('./secrets.json')['authentication-token'];

      // TODO Sync this
      // return Keychain.getPassword({
      //   account: 'default',
      //   service: 'gitter-cli'
      // });
      return deferred.promise;
    },
    setToken: function (token) {


      // return Keychain.setPassword({
      //   account: 'default',
      //   service: 'gitter-cli',
      //   password: token
      // });
    }
  }
};

exports = module.exports = Configuration;
