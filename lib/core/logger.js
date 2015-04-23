var Winston = require('winston');

var logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.File)({
      filename: 'gitter-cli.log'
    })
  ]
});


exports = module.exports = logger;
