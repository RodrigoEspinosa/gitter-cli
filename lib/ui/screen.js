var Path = require('path');
var Blessed = require('blessed');

exports = module.exports = function (context) {
  // Create the screen object.
  var screen = Blessed.screen({
    autoPadding: true,
    smartCSR: true,
    useBCE: true,
    cursor: {
      artificial: true,
      blink: true,
      shape: 'underline'
    },
    log: Path.join(__dirname, '..', '..', 'gitter-cli-blessed.log'),
    debug: true,
    dump: true,
    fullUnicode: true,
    dockBorders: true,
    ignoreLocked: ['C-c']
  });

  // Set the terminal title.
  screen.title = 'Gitter';

  return screen;
};
