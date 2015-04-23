var Fs = require('fs');
var Path = require('path');
var Q = require('q');
var Keychain = require('keychain');

var Configuration = {
  secretsFileLocation: Path.join(__dirname, 'secrets.json'),

  /**
   * Store the current session token.
   *
   * @static
   */
  token: null,

  access: {
    /**
     * Get the token from the secrets file.
     *
     * @return {promise}
     */
    getToken: function () {
      // Construct the promise instance.
      var deferred = Q.defer();

      // Check if the session token already exists.
      if (Configuration.token !== null) {
        // Resolve the promise with the existing token.
        return deferred.resolve(token);
      }

      // Read the json formatted file where the secrets settings lives.
      Fs.readFile(Configuration.secretsFileLocation, {encoding: 'utf8'}, function (err, res) {
        if (err) deferred.reject(err);

        // Parse the json document.
        var data = JSON.parse(res);

        // Set the configuration token.
        Configuration.token = data['authentication-token'];

        // Resolve the promise with the token.
        deferred.resolve(Configuration.token);
      });

      // TODO Sync this
      // return Keychain.getPassword({
      //   account: 'default',
      //   service: 'gitter-cli'
      // });

      // Return the promise object.
      return deferred.promise;
    },

    /**
     * TODO Needs to be implemented.
     *
     * @param {string} token
     * @return {void}
     */
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
