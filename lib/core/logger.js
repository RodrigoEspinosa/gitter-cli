var Winston = require('winston');

var logger = new (Winston.Logger)({
  transports: [
    // new (Winston.transports.Console)(),
    new (Winston.transports.File)({
      filename: 'somefile.log'
    })
  ]
});


exports = module.exports = logger;
