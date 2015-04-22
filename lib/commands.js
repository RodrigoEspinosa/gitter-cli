var chalk = require('chalk');
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
    if (typeof requireAuthentication === 'undefined' || requireAuthentication) {
      // TODO Needs to be implemented.
    } else {
      // TODO Needs to be implemented.
    }
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
      Configuration.access.setToken(token);

      // TODO Display the user information if the token is correct.
      // TODO If the token is not correct, display an error.

      // Stop the execution of the method.
      return undefined;
    }

    // Display the 'Go to url' message with the instructions on the screen.
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
   * Join a room an display the interface for the chat.
   *
   * @param {string} roomName
   * @return {void}
   */
  joinRoom: function (roomName) {
    Command._requireAuthentication(true).then(function () {
      // Require the `Room` model.
      var Room = require('./models/room');

      // Try to join a room.
      var room = new Room();
      room.join(roomName);

      // Load the user interface.
      var ui = require('./ui/main')({
        room: room
      });
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
