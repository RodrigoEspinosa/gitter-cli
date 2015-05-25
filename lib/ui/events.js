exports = module.exports = function (UI) {

  /**
   * Set the chat history height based on the screen height.
   *
   * @returns {void}
   */
  var setHistoryHeight = function () {
    // Set the history component dynamic height.
    UI.components.history.height = UI.screen.height - UI.components.input.height;
  };

  /**
   * Send a message based on the input component value.
   * Then, clear the input component.
   * @returns {void}
   */
  var sendMessage = function () {
    var message = UI.components.input.getValue();
    UI.context.room.writeMessage(message);

    UI.components.input.clearValue();
    UI.screen.render();
  };

  UI.screen.on('prerender', function () {
    setHistoryHeight();
  });

  UI.screen.on('resize', function () {
    setHistoryHeight();
    UI.screen.render();
  });

  // Handle `Control+s` to send the message.
  UI.screen.program.on('keypress', function (ch, key) {
    if (key.ctrl && key.name === 's') {
      sendMessage();
    }
  });

  // Quit on `q`, or `Control-C` when the focus is on the screen.
  UI.screen.key(['q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  // Focus on `escape` or `i` when focus is on the screen.
  UI.screen.key(['escape', 'i'], function () {
    // Set the focus on the input.
    UI.components.input.focus();
  });

  // History scrolling events.
  UI.screen.key(['up', 'k', 'C-up', 'C-k'], function (ch, key) {
    var amount = (key.ctrl) ? 10 : 1;
    UI.components.history.scrollUp();
  });
  UI.screen.key(['down', 'j', 'C-down', 'C-j'], function (ch, key) {
    var amount = (key.ctrl) ? 10 : 1;
    UI.components.history.scrollDown();
  });

  // Handle the event when fetching the last messages.
  UI.context.room.on('chatMessages', function (messages) {
    // Get each message.
    messages.forEach(function (message) {
      // Append the message string to the history list.
      UI.components.history.addMessage(message);
    });

    // Go to the end of the list.
    UI.components.history.setScrollPerc(100);
  });

  // Handle the new chat message event on the streaming.
  UI.context.room.on('streaming:chatMessages', function (message) {
    // Append the message string to the history list.
    UI.components.history.addMessage(message);

    // Go to the end of the list.
    UI.components.history.setScrollPerc(100);
  });

};
