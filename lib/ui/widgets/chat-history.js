var Blessed = require('blessed');
var wordwrap = require('wordwrap');

var ChatHistoryMessage = require('./chat-history-message');

var ChatHistory = function (options) {
  if (!(this instanceof Blessed.Node)) {
    return new ChatHistory(options);
  }

  options = options || {};
  options.shrink = true;
  Blessed.Element.call(this, options);
};

ChatHistory.prototype = Object.create(Blessed.Element.prototype);
ChatHistory.prototype.type = 'chatHistory';

// Set an empty collection for storing the current messages in the chat history.
ChatHistory.prototype.messages = [];

ChatHistory.prototype.getTotalLines = function () {
  return this.children.map(function (node) {
    return node.message.linesAmount;
  }).reduce(function (prevVal, actualVal) {
    return prevVal + actualVal;
  }, 0);
};

/**
 * Add a message to the chat history board.
 *
 * @param {string}
 * @return {void}
 */
ChatHistory.prototype.addMessage = function (message) {
  var chatMessage = new ChatHistoryMessage({
    screen: this.screen,
    align: this.align || 'left',
    right: (this.scrollbar ? 1 : 0),
    tags: this.parseTags,
    model: message,
    top: this.getTotalLines()
  });

  chatMessage.position.top = this.getTotalLines();

  // Add the message to the chat history messages collection.
  this.messages.push(message);
  this.append(chatMessage);
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


exports = module.exports = ChatHistory;
