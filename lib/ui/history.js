var format = require('util').format;
var wordwrap = require('wordwrap');

var Blessed = require('blessed');
var logger = require('../core/logger');

var ChatHistory = Blessed.element;

// Set an empty collection for storing the current messages in the chat history.
ChatHistory.prototype.messages = [];


/**
 * Render the text to be inserted in the `ChatHistory.prototype.addMessage`
 * function.
 *
 * @param {string}
 * @return {string}
 */
ChatHistory.prototype.addMessageHelper = function (message) {
  var authorLength = message.getAuthor().length + 3,
      parentWidth = this.parent.width,
      messageMaxWidth = this.width - authorLength - 4,
      messageText = message.getText();

  // Check if the message text is smaller than the max for the screen.
  if (messageText.length < messageMaxWidth) {
    // Return the message text unmodified.
    return messageText;
  } else {
    // Word wrap the original message
    messageText = wordwrap(messageMaxWidth)(messageText);

    // Return the processed message text.
    return messageText.split('\n').map(function (line, index) {
      // If is the first line, then leave it as it is.
      if (index < 1) {
        return line;
      }

      // Append a number `authorLength` number of spaces before the line.
      return Array(authorLength).join(' ') + line;
    }).join('\n');
  }
};

/**
 * Add a message to the chat history board.
 *
 * @param {string}
 * @return {void}
 */
ChatHistory.prototype.addMessage = function (message) {
  var authorName = message.getAuthorWithColor(),
      messageText = this.addMessageHelper(message);

  // Append the processed line to the chat history board.
  this.pushLine(format('%s: %s', authorName, messageText));

  // Add the message to the chat history messages collection.
  this.messages.push(message);
};

/**
 * Scroll the chat history board one line up.
 *
 * @return {void}
 */
ChatHistory.prototype.scrollUp = function () {
  if (this.getScrollPerc() > 0) {
    this.setScrollPerc(this.getScrollPerc() - 10);
  }
};

/**
 * Scroll the chat history board one line down.
 *
 * @return {void}
 */
ChatHistory.prototype.scrollDown = function () {
  if (this.getScrollPerc() < 100) {
    this.setScrollPerc(this.getScrollPerc() + 10);
  }
};

exports = module.exports = function (context) {
  // Create the new chat history instance.
  var history = ChatHistory({
    top: 0,
    left: 0,
    tags: true,
    width: '100%',
    padding: 1,
    scrollbar: true,
    scrollable: true,
    style: {
      fg: '#fff',
      bg: '#555',
      border: {
        bg: 'blue'
      },
      scrollbar: {
        bg: '#353535',
        fg: '#f1f1f1'
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
    history.setScrollPerc(100);
  });

  // Handle the new chat message event on the streaming.
  context.room.on('streaming:chatMessages', function (message) {
    // Append the message string to the history list.
    history.addMessage(message);

    // Go to the end of the list.
    history.setScrollPerc(100);
  });

  // Return the chat history instance.
  return history;
};
