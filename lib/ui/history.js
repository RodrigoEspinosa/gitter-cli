var format = require('util').format;

var Blessed = require('blessed');
var logger = require('../core/logger');

exports = module.exports = function (context) {
  var history = Blessed.list({
    top: 0,
    left: 0,
    vi: true,
    tags: true,
    width: '100%',
    autoPadding: true,
    inputOnFocus: true,
    padding: {
      top: 1,
      left: 1,
      bottom: 1,
      right: 1
    },
    style: {
      fg: '#fff',
      bg: '#555',

      selected: {
        bg: '#888',
      }
    }
  });

  // Handle the event when fetching the last messages.
  context.room.on('chatMessages', function (messages) {
    // Get each message.
    messages.forEach(function (message) {
      // Set the format to display the message.
      var historyMessage = format('{bold}%s:{/bold} %s',
        message.fromUser.username,
        message.text
      );

      // Append the message string to the history list.
      history.addItem(historyMessage);
    });

    // Go to the end of the list.
    history.select(messages.length);
  });

  // Handle the new chat message event on the streaming.
  context.room.on('streaming:chatMessages', function (message) {
    // Log the recived message event.
    logger.info(format('New message from %s: %s',
      message.model.fromUser.username,
      message.model.text
    ));

    var historyMessage = format('{bold}%s:{/bold} %s',
      message.model.fromUser.username,
      message.model.text
    );

    history.addItem(historyMessage);
  });

  return history;
};
