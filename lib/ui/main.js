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

  this.context.room.on('joinError', function (err) {
    process.exit(1);
  });
};
