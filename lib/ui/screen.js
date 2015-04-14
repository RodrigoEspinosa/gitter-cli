var Blessed = require('blessed');

exports = module.exports = function (context) {
  // Create the screen object.
  var screen = Blessed.screen({
    autoPadding: true,
    smartCSR: true,
    artificialCursor: true,
    cursorBlink: true,
    cursorShape: 'underline',
    dockBorders: true
  });

  // Set the terminal title.
  screen.title = 'Gitter';

  return screen;
};
