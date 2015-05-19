var Q = require('q');
var chalk = require('chalk');

var Gitter = require('./core/connection');
var User = require('./models/user');
var Configuration = require('./core/configuration');

var Commands = {

  /**
   * Authorization required wrapper.
   *
   * @private
   * @param {bool} requireAuthentication
   * @return {void}
   */
  _requireAuthentication: function (requireAuthentication) {
    var defer = Q.defer();

    if (typeof requireAuthentication === 'undefined' || requireAuthentication) {
      Gitter.then(function (gitterInstance) {
        defer.resolve();
      }).catch(function () {
        defer.reject();
      });
    } else {
      defer.resolve();
    }

    return defer.promise;
  },

  /**
   * Authorize a token or display a message to informe
   * the user how to get it.
   *
   * @params {string} token
   * @return {void}
   */
  authorize: function (token) {
    if (typeof token === 'string') {
      // Set the token based on the user input.
      Configuration.access.setToken(token).catch(function () {
        // Or if the token is not correct, display an error.
        console.log('\n%s\n', chalk.red('The token is not correct.'));
      });

      // Stop the execution of the method.
      return undefined;
    }

    // Display the "Go to url" message with the instructions on the screen.
    console.log('\nGo to %s to get your access token.',
      chalk.blue('https://developer.gitter.im/apps')
    );
    console.log('Then, copy your %s and run:\n', chalk.bold('Personal Access Token'));
    console.log('    %s %s',
      chalk.bold('gitter-cli authorize'),
      chalk.bold(chalk.green('paste-your-token-here'))
    );
    console.log(chalk.dim(
      '\n\nVisit the repository to know what\'s happening behind the scenes.'
    ));
  },

  /**
   * Display current user information or "You are not logged in."
   * message if the user doesn't have a valid token.
   *
   * @return {void}
   */
  whoAmI: function () {
    Commands._requireAuthentication(true).then(function () {
      User.getCurrentUser().then(function (user) {
        console.log('\n     You are: %s (%s)\n',
          chalk.bold(user.displayName),
          user.username
        );
      });

    }).catch(function () {
      console.log('You are not logged in.');
    });
  },

  /**
   * Join a room an display the interface for the chat.
   *
   * @param {string} roomName
   * @return {void}
   */
  joinRoom: function (roomName) {
    // Ensure that the room name is a string.
    if (typeof roomName !== 'string') {
      // If the room name is not a string, display a error message.
      console.log(chalk.red('You must provide a valid room name.'));
      // Finish the script excecution.
      process.exit(1);
    }

    Commands._requireAuthentication(true).then(function () {
      // Require the `Room` model.
      var Room = require('./models/room');

      // Try to join a room.
      var room = new Room();
      room.join(roomName);

      // Load the user interface.
      var ui = require('./ui/main')({ room: room });
    });
  },

  /**
   * Set the access token to be the specified token.
   *
   * @param {string} token
   * @return {void}
   */
  setToken: function (token) {
    require('./core/configuration').access.setToken(token);
  }
};

exports = module.exports = Commands;
