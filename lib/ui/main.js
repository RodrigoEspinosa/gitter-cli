var Blessed = require('blessed');

var logger = require('../core/logger');

// Initialize the user interface object and export it.
exports = module.exports = function (context) {
  var self = this;

  // Populate the context object.
  this.context = context;

  // Perform the screen setup.
  this.screen = require('./screen')(context);

  this.loading = require('./loading')(context);

  // Require each component.
  this.components = {
    input: require('./message-input')(context),
    history: require('./history')(context)
  };

  // Display a loading bar until the chat creates.
  this.loading.load('Loading');
  this.screen.append(this.loading);

  // Render the user interface.
  this.screen.render();

  // Display the chat when on joined the room.
  this.context.room.on('join', function () {
    // Remove the loading screen.
    self.loading.stop();

    // Append each component to the screen.
    for (var component in self.components) {
      if (self.components.hasOwnProperty(component)) {
        self.screen.append(self.components[component]);
      }
    }

    // Handle all the events.
    require('./events')(self);

    // Render the user interface.
    self.screen.render();
  });

  // Display an error message an exit the application when there is error on join.
  this.context.room.on('joinError', function (err) {
    // Log the error.
    logger.error('There was an error joining the room.');

    // Create a new blessed message box instance.
    var message = Blessed.Message();

    // Remove the loading screen.
    self.loading.stop();

    // Add the error message to the blessed message box instance.
    message.error('There was an error joining the room.', function () {
      process.exit(1);
    });

    // Append the message to the screen and render it.
    self.screen.append(message);
    self.screen.render();
  });
};
