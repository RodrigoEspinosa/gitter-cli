var format = require('util').format;

var Blessed = require('blessed');
var logger = require('../core/logger');

exports = module.exports = function (context) {
  var history = Blessed.list({
    top: 0,
    left: 0,
    tags: true,
    width: '100%',
    padding: 1,
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
      // Append the message string to the history list.
      history.addItem(message.getMessageDisplayFormat());
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
