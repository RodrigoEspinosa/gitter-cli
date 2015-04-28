var format = require('util').format;

var User = require('./user');

/**
 * Represents a message.
 * @constructor
 */
var Message = function () {
  // id: ObjectId,
  // text: String,
  // html: String,
  // sent: Date,
  // editedAt: Date || null,
  // fromUser: {
  //   id: ObjectId,
  //   username: String,
  //   displayName: String,
  //   url: String,
  //   avatarUrlSmall: Url,
  //   avatarUrlMedium: Url,
  //   gv: String,
  //   v: Number
  // },
  // unread: Boolean,
  // readBy: Number,
  // urls: Array,
  // mentions: Array,
  // issues: Array,
  // meta: Object
  //
};

Message.prototype.postInit = function () {
  // Set the message author attribute with the `Author` instance.
  this.author = User.getOrCreate(this.fromUser);
};

Message.prototype.getText = function () {
  return this.text || '';
};

Message.prototype.getAuthor = function () {
  return this.author.displayName;
};

Message.prototype.getAuthorWithColor = function () {
  var color = this.author.getAuthorColor();

  return format('{%s-fg}%s{/%s-fg}', color, this.author.getDisplayName(), color);
};

/**
 * Convert a recived message object insto `Message` instance.
 *
 * @param {string} message
 * @return {string}
 */
Message.createInstance = function (message) {
  // Intialize the `Message` instance.
  var instance = new Message();

  if (message.hasOwnProperty('model')) {
    message = message.model;
  }

  for (var attrName in message) {
    if (message.hasOwnProperty(attrName)) {
      instance[attrName] = message[attrName];
    }
  }

  // Call the user post contructor method.
  instance.postInit();

  // Return the `Message` instance.
  return instance;
};

/**
 * Convert a recived messages list objects into `Messages` instances.
 *
 * @param {string} message
 * @return {string}
 */
Message.createInstancesList = function (messages) {
  // Initialize the instances list.
  var instancesList = [];

  // Create a new instance for every message object.
  messages.forEach(function (message) {
    // Push the new instance into the instances list.
    instancesList.push(Message.createInstance(message));
  });

  // Return the list of instances.
  return instancesList;
};

exports = module.exports = Message;
