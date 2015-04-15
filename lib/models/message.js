var format = require('util').format;

var gitter = require('../core/connection');

var authorColorList = [
  '#ff0000',  // red
  '#99ccff',  // skyblue
  '#0099ff',  // blue
  '#cc99ff',  // violet
  '#ffff66',  // yellow
];

var associatedUsersColors = {};

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

Message.prototype.getText = function () {
  return this.text || '';
};

Message.prototype.getAuthor = function () {
  return this.fromUser.displayName;
};

Message.prototype.getAuthorWithColor = function () {
  // TODO: Implement the random color aproach.
  // var color = authorColorList[~~(Math.random() * authorColorList.length)];

  var color = authorColorList[this.getAuthor().length % authorColorList.length];

  return format('{%s-fg}%s{/%s-fg}', color, this.getAuthor(), color);
};

Message.prototype.getMessageDisplayFormat = function () {
  return format('{bold}%s{/bold}: %s', this.getAuthorWithColor(), this.getText());
};

// Conver ta recived message object insto `Message` instance.
Message.createInstance = function (message) {
  // Intialize the `Message` instance.
  var instance = new Message();

  for (var attrName in message) {
    if (message.hasOwnProperty(attrName)) {
      instance[attrName] = message[attrName];
    }
  }

  // Return the `Message` instance.
  return instance;
};

// Convert a recived messages list objects into `Messages` instances.
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
