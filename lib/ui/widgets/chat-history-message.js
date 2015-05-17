var format = require('util').format;
var wordwrap = require('wordwrap');

var Blessed = require('blessed');

var ChatHistoryMessage = function (options) {
  if (!(this instanceof Blessed.Node)) {
    return new ChatHistoryMessage(options);
  }

  options = options || {};
  options.shrink = true;
  options.tags = true;
  options.top = 0;
  options.left = 0;
  options.style = {
    bg: '#555',
  };


  Blessed.Box.call(this, options);

  var messageText = this.getMessageText(options.messageInstance);

  this.message = {
    content: messageText,
    linesAmount: this.getLinesAmount(messageText)
  };

  this.content = this.message.content;
  this.height = this.message.linesAmount;
  this.rows = this.height;
};

ChatHistoryMessage.prototype = Object.create(Blessed.Box.prototype);
ChatHistoryMessage.prototype.type = 'chatHistoryMessage';


/**
 * Render the text to be inserted in the chat history.
 *
 * @param {string} message
 * @return {string}
 */
ChatHistoryMessage.prototype.getMessageText = function (message) {
  var authorLength = message.author.getDisplayName().length + 3,
      parentWidth = this.screen.width,
      messageMaxWidth = this.screen.width - authorLength - 4,
      messageText = message.text;

  // Check if the message text is smaller than the max for the screen.
  if (messageText.length > messageMaxWidth) {
    // Word wrap the original message.
    messageText = wordwrap(messageMaxWidth)(messageText);

    // Process the message text.
    messageText = messageText.split('\n').map(function (line, index) {
      // If is the first line, then leave it as it is.
      if (index < 1) {
        return line;
      }

      // Append a number `authorLength` number of spaces before the line.
      return Array(authorLength).join(' ') + line;
    }).join('\n');
  }

  var authorWithColor = format('{%s-fg}%s{/%s-fg}',
    message.author.getAuthorColor(),
    message.author.getDisplayName(),
    message.author.getAuthorColor()
  );

  return format('%s: %s', authorWithColor, messageText);
};

/**
 * Return the amount of lines.
 *
 * @param {string} messageText
 * @return {number}
 */
ChatHistoryMessage.prototype.getLinesAmount = function (messageText) {
  var amountOfLineBrakes = messageText.split('\n').length;
  return (amountOfLineBrakes > 0) ? amountOfLineBrakes : 1;
};

exports = module.exports = ChatHistoryMessage;
