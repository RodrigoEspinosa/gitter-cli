var Gitter = require('../core/connection');

Array.prototype.random = function () {
  return this[~~(Math.random() * this.length)];
};

var authorColorList = [
  '#ff0000',  // red
  '#99ccff',  // skyblue
  '#0099ff',  // blue
  '#cc99ff',  // violet
  '#ffff66',  // yellow
];

// Set a singleton object with all the existing users in the program.
var userInstances = {};

var User = function (data) {
  /** If defined, the object have following structure:
   *
   *  fromUser: {
   *    id: ObjectId,
   *    username: String,
   *    displayName: String,
   *    url: String,
   *    avatarUrlSmall: Url,
   *    avatarUrlMedium: Url,
   *    gv: String,
   *    v: Number
   *  }
   */
};

User.prototype.postInit = function () {

  if (!userInstances.hasOwnProperty(this.username)) {
    userInstances[this.username] = this;
  }
};

User.prototype.getUsername = function () {
  return this.username;
};

User.prototype.getDisplayName = function () {
  return this.displayName;
};

User.prototype.getAuthorColor = function () {
  if (this.color !== undefined) {
    return this.color;
  }

  this.color = authorColorList.random();
  return this.color;
};

User.getCurrentUser = function () {
  return Gitter.currentUser();
};

User.createInstance = function (data) {
  var user = new User();

  // Check if the data is defined.
  if (typeof data !== 'undefined') {
    // Add every attribute to the current instance.
    for (var attrName in data) {
      if (data.hasOwnProperty(attrName)) {
        user[attrName] = data[attrName];
      }
    }
  }

  // Call the user post contructor method.
  user.postInit();

  // Return the user instance.
  return user;
};

User.getOrCreate = function (user) {
  if (userInstances.hasOwnProperty(user.username)) {
    return userInstances[user.username];
  }
  return User.createInstance(user);
};


exports = module.exports = User;
