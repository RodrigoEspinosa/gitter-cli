var format = require('util').format;

var Blessed = require('blessed');
var logger = require('../core/logger');

exports = module.exports = function (context) {
  var history = Blessed.list({
    top: 0,
    left: 0,
    tags: true,
    width: '100%',
    autoPadding: true,
    inputOnFocus: false,
    padding: {
      top: 1,
      left: 1,
      bottom: 1,
      right: 1
    },
    style: {
      fg: '#fff',
      bg: '#555'
    }
  });

  context.room.on('chatMessages', function (messages) {
    messages.forEach(function (message) {
      var historyMessage = format('{bold}%s:{/bold} %s',
        message.fromUser.username,
        message.text
      );

      history.addItem(historyMessage);
    });
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
