var logger = require('../core/logger');
var ChatHistory = require('./widgets/chat-history');
var Blessed = require('blessed');

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

  // Return the chat history instance.
  return history;
};
