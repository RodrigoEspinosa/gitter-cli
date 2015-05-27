var ChatHistory = require('./widgets/chat-history');
var Blessed = require('blessed');
var Styles = require('./styles.json');
var logger = require('../core/logger');

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
    style: Styles.history
  });

  // Return the chat history instance.
  return history;
};
