var Blessed = require('blessed');

exports = module.exports = function (context) {
  var input = Blessed.textarea({
    bottom: 0,
    height: 3,
    autoPadding: true,
    inputOnFocus: true,
    padding: {
      top: 1,
      left: 2
    },
    style: {
      fg: '#787878',
      bg: '#454545',

      focus: {
        fg: '#f6f6f6',
        bg: '#353535',
      }
    }
  });

  return input;
};
