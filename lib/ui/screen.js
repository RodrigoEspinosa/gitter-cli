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
    dockBorders: true
  });

  // Set the terminal title.
  screen.title = 'Gitter';

  return screen;
};
