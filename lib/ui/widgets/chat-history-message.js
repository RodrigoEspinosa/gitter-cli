var Blessed = require('blessed');
var Marked = require('../../core/marked');
var HtmlToText = require('html-to-text');

var format = require('util').format;
var wordwrap = require('wordwrap');

// Set the lexer to be compatible with GitHub flavored markdown.
var Lexer = new Marked.Lexer({
  gfm: true,
  tables: false,
  pedantic: true,
  sanitize: true,
  smartypants: true
});


/**
 * ChatHistoryMessage, inherits from `Blessed.Box`
 *
 * @param {object} options (optional)
 * @return {object}
 */
var ChatHistoryMessage = function (options) {
  // Ensure the `new` instance.
  if (!(this instanceof Blessed.Node)) {
    return new ChatHistoryMessage(options);
  }

  // Override some options.
  options = options || {};
  options.shrink = true;
  options.tags = true;
  options.top = 0;
  options.left = 0;
  options.style = {
    bg: '#555',
  };

  // // Check if the message is unread.
  // if (model.messageInstance.unread) {
  //   // Set a highlighted background color.
  //   options.style.bg = '#888';
  // }

  // Call the super.
  Blessed.Box.call(this, options);

  this.displayAuthorName = options.displayAuthorName;

  // Get the `chatHistoryMessage` content.
  var messageText = this.getMessageText(options.model);

  // Create the message object for the current instance.
  this.message = {
    content: messageText,
    linesAmount: this.getLinesAmount(messageText)
  };

  // Set the instance content to be the parsed text message.
  this.content = this.message.content;

  // Set the instance height to match the message lines.
  this.height = this.message.linesAmount;
  this.rows = this.height;
};

ChatHistoryMessage.prototype = Object.create(Blessed.Box.prototype);
ChatHistoryMessage.prototype.type = 'chatHistoryMessage';

/**
 * Parse the text to be inserted in the chat history.
 *
 * @param {string} messageText
 * @param {number} wordwrap
 * @return {string}
 */
ChatHistoryMessage.prototype.parseText = function (messageText, wordwrap) {
  // Tokenize and parse the original text using the blessed-markdown parser.
  var tokens = Lexer.lex(messageText);
  messageText = Marked.parser(tokens);

  // Convert any unconsiderated HTML to text.
  messageText = HtmlToText.fromString(messageText, {
    wordwrap: wordwrap || 80
  });

  // Return the clean message text.
  return messageText;
};

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

  // Parse the current text.
  messageText = this.parseText(messageText, messageMaxWidth);

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

  var authorWithColor;
  if (this.displayAuthorName) {
    // Get the author name with his distintive display color.
    authorWithColor = format('{%s-fg}%s{/%s-fg}:',
      message.author.getAuthorColor(),
      message.author.getDisplayName(),
      message.author.getAuthorColor()
    );
  } else {
    authorWithColor = Array(message.author.getDisplayName().length + 1).join(' ');
  }

  // Return the parsed text with a `{author}: {message}` format.
  return format('%s %s', authorWithColor, messageText);
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
