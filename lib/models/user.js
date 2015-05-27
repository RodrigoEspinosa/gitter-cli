var Q = require('q');
var Gitter = require('../core/connection');
var Styles = require('../ui/styles.json');

Array.prototype.random = function () {
  return this[~~(Math.random() * this.length)];
};

var authorColorList = Styles['author-possible-colors'];

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
  if (this.displayName && this.displayName.trim() !== '') {
    return this.displayName;
  }

   return '@' + this.getUsername();
};

User.prototype.getAuthorColor = function () {
  if (this.color !== undefined) {
    return this.color;
  }

  this.color = authorColorList.random();
  return this.color;
};

User.getCurrentUser = function () {
  var defer = Q.defer();

  Gitter.then(function (gitter) {
    gitter.currentUser().then(function (currentUser) {
      defer.resolve(currentUser);
    }).catch(function (err) {
      defer.reject(err);
    });
  });

  return defer.promise;
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
