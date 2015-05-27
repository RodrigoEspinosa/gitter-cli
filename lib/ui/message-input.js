var Blessed = require('blessed');
var Styles = require('./styles.json');

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
    style: Styles['message-input']
  });

  return input;
};
