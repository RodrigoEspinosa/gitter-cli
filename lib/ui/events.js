exports = module.exports = function (UI) {

  var setHistoryHeight = function () {
    // Set the history component dynamic height
    UI.components.history.height = UI.screen.height - UI.components.input.height;
  };

  UI.screen.on('prerender', function () {
    setHistoryHeight();
  });

  UI.screen.on('resize', function () {
    setHistoryHeight();
    UI.screen.render();
  });

  // If box is focused, handle `Control+s`.
  UI.components.input.key('C-s', function(ch, key) {
    var message = this.getValue();
    UI.context.room.writeMessage(message);

    this.clearValue();
    UI.screen.render();
  });

  // Quit on `q`, or `Control-C` when the focus is on the screen
  UI.screen.key(['q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  // Focus on `escape` or `i` when focus is on the screen.
  UI.screen.key(['escape', 'i'], function () {
    // Set the focus on the input.
    UI.components.input.focus();
  });
};
