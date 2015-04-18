var Program = require('commander');

var Command = {
  /**
   * Join a room an display the interface for the chat.
   *
   * @param {string} roomName
   * @return {void}
   */
  joinRoom: function (roomName) {
    var Room = require('./models/room');

    // Try to join a room
    var room = new Room();
    room.join(roomName);

    // Load the ui
    var ui = require('./ui/main')({
      room: room
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


// Define the program commands.
Program
  .version(require('../package.json').version)
  .command('join [name]')
  .alias('j')
  .description('Join a room with the specified name.')
  .action(Command.joinRoom)
  .option('--token [token]', 'Set the access-key token for client authentication.');


// Parse the application arguments.
Program.parse(process.argv);

// Check if there is a token on the arguments.
if (Program.token) {
  Command.setToken(Program.token);
}
