var Fs = require('fs');
var Path = require('path');
var Q = require('q');
var Keychain = require('keychain');

var Configuration = {
  secretsFileLocation: Path.join(__dirname, 'secrets.json'),

  /**
   * Load the secrets file. `fs.readFile` wrapper.
   *
   * @param {function} callback.
   * @return {function}
   */
  _loadSecrets: function (callback) {
    return Fs.readFile(Configuration.secretsFileLocation, {encoding: 'utf8'}, callback);
  },

  /**
   * Synchronously load the secrets file.
   *
   * @return {string}
   */
  _loadSecretsSync: function () {
    return Fs.readFileSync(Configuration.secretsFileLocation, {encoding: 'utf8'});
  },

  /**
   * Get the contents of the secret file.
   *
   * @return {object}
   */
  _getSecrets: function () {
    try {
      return JSON.parse(Configuration._loadSecretsSync());
    } catch (error) {
      return {};
    }
  },

  /**
   * Store the current session token.
   *
   * @static
   */
  token: null,

  access: {
    /**
     * TODO Needs to be implemented.
     * Check if token is correct.
     *
     * @private
     * @param {String} token.
     * @return {boolean}
     */
    _isTokenCorrect: function (token) {
      return true;
    },

    /**
     * Get the token from the secrets file.
     *
     * @return {promise}
     */
    getToken: function () {
      // TODO Sync this
      // return Keychain.getPassword({
      //   account: 'default',
      //   service: 'gitter-cli'
      // });

      // Construct the promise instance.
      var deferred = Q.defer();

      // Check if the session token already exists.
      if (Configuration.token !== null) {
        // Resolve the promise with the existing token.
        return deferred.resolve(token);
      }

      // Read the json formatted file where the secrets settings lives.
      var secretsData = Configuration._getSecrets();

      // Ensure that the secrets has an authentication-token attribute.
      if (!secretsData.hasOwnProperty('authentication-token')) {
        deferred.reject(new Error('Secrets file has no authentication-token.'));
      } else {
        // Set the configuration token.
        Configuration.token = secretsData['authentication-token'];

        // Resolve the promise with the token.
        deferred.resolve(Configuration.token);
      }

      // Return the promise object.
      return deferred.promise;
    },

    /**
     * Set the token for the secrets file.
     *
     * @param {string} token
     * @return {void}
     */
    setToken: function (token) {
      // TODO Add this................
      // return Keychain.setPassword({
      //   account: 'default',
      //   service: 'gitter-cli',
      //   password: token
      // });
      // TODO end this................

      var deferred = Q.defer();

      // Check if the token is correct.
      if (Configuration.access._isTokenCorrect(token)) {
        // Ensure that the secrets file exists.
        if (!Fs.existsSync(Configuration.secretsFileLocation)) {
          Fs.writeFileSync(Configuration.secretsFileLocation, '{}');
        }

        // Save the token into the configuration attribute.
        Configuration.token = token;

        // Get an object with the secrets content.
        var secretsData = Configuration._getSecrets();

        // Set the configuration token on the data.
        secretsData['authentication-token'] = token;

        var data = JSON.stringify(secretsData, null, 2);

        // Update the secrets file with the upadted token.
        Fs.writeFile(Configuration.secretsFileLocation, data, function (err) {
          if (err) deferred.reject(err);

          // Resolve the promise.
          deferred.resolve();
        });
      } else {
        // Reject the promise with "Invalid token" error.
        deferred.reject(new Error('Invalid token.'));
      }


      // Return the promise.
      return deferred.promise;
    }
  }
};

exports = module.exports = Configuration;
