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
   * @param {string} token
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
   * Displays a list of rooms that the users is part of.
   *
   * @return {void}
   */
  rooms: function () {
    /**
     * Display every room on the rooms lists with a color
     * based on the unreadItems.
     *
     * @param {list}
     * @return {void}
     */
    var displayRooms = function (rooms) {
      // Get the maximum room length name of the list.
      var maxRoomLength = rooms.map(function (room) {
        return room.name.length;
      }).reduce(function (prev, val) {
        return (prev > val) ? prev : val;
      }, 0);

      // Increase the max room length to consider the space.
      maxRoomLength += 1;

      // Display every room.
      rooms.forEach(function (room, index) {
        // Set the format for the room name.
        var roomName = room.name;
        if (roomName.length > maxRoomLength) {
          roomName = roomName.substring(0, maxRoomLength - 3) + '...';
        } else {
          roomName += Array(maxRoomLength - roomName.length).join(' ');
        }

        // Get the badge for the current item based on the number of unread messages.
        var badge = (room.unreadItems > 0) ? chalk.green : chalk.bgBlack;

        // Display the item in the console.
        console.log(badge(
          ++index + '.',                        // Display the index number.
          Array((index > 9) ? 4 : 5).join(' '), // Display a empty amount of spaces.
          roomName,                             // Display the room name.
          room.unreadItems                      // Display the unread messages count.
        ));
      });
    };

    // Display each of the user rooms if the user is authenticated.
    Commands._requireAuthentication(true)
      .then(User.getCurrentUser)
      .then(function (user) { return user.rooms(); })
      .then(displayRooms)
      .catch(function () {
        console.log('You are not logged in.');
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
