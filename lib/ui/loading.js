var Blessed = require('blessed');

exports = module.exports = function (context) {
  // Return a new blessed `Loading` instance.
  return Blessed.loading();
};
