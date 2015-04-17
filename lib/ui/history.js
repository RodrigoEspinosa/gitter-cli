var format = require('util').format;

var Blessed = require('blessed');
var logger = require('../core/logger');

var ChatHistory = Blessed.element;


/**
 * Render the text to be inserted in the `ChatHistory.prototype.addMessage`
 * function.
 *
 * @param String
 * @return String
 */
ChatHistory.prototype.addMessageHelper = function (message) {
  var authorLength = message.getAuthor().length + 3;
  var parentWidth = this.parent.width;
  var messageMaxWidth = parentWidth - authorLength - 3;
  var messageText = message.getText();

  messageText = messageText.replace('\n', '');

  if (messageText.length < messageMaxWidth) {
    return messageText;
  } else {
    var lines = '',
        currentLineCount = 0;

    for (var i = 0; i < messageText.length; i += 1) {
      if (currentLineCount > messageMaxWidth) {
        currentLineCount = 0;
        lines += '\n' + Array(authorLength).join(' ') + messageText.charAt(i);
      } else {
        currentLineCount += 1;
        lines += messageText.charAt(i);
      }

    }
    return lines;
  }
};

/**
 * Add a message to the chat history board.
 *
 * @param String
 * @return Void
 */
ChatHistory.prototype.addMessage = function (message) {
  var authorName = message.getAuthorWithColor();
  var messageText = this.addMessageHelper(message);

  this.pushLine(format('%s: %s', authorName, messageText));
};

exports = module.exports = function (context) {
  var history = ChatHistory({
    top: 0,
    left: 0,
    tags: true,
    width: '100%',
    padding: 1,
    scrollable: true,
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
      history.addMessage(message);
    });

    // Go to the end of the list.
    // history.select(messages.length);
  });

  // Handle the new chat message event on the streaming.
  context.room.on('streaming:chatMessages', function (message) {
    // Append the message string to the history list.
    history.addMessage(message);
  });

  return history;
};
