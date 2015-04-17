var Program = require('commander');

Program
  .version(require('./package.json').version)
  .option('--token [token]', 'Set the access-key token for client authentication.')
  .option('-j, --join [name]', 'Join a room with the specified name.');

Program.parse(process.argv);

if (Program.token) {
  require('./lib/core/configuration').access.setToken(Program.token);
}

if (Program.join) {
  var Room = require('./lib/models/room');

  // Try to join a room
  var room = new Room();
  room.join(Program.join);

  // Load the ui
  var ui = require('./lib/ui/main')({
    room: room
  });

}
