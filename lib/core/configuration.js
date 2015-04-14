var Keychain = require('keychain');

exports = module.exports = {
  access: {
    getToken: function () {
      return require('./secrets.json')['authentication-token'];

      // TODO Sync this
      // return Keychain.getPassword({
      //   account: 'default',
      //   service: 'gitter-cli'
      // });
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
