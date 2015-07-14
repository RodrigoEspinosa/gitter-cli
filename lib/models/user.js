var Q = require('q');
var Gitter = require('../core/connection');
var Styles = require('../ui/styles.json');

/**
 * Get a random element from the array.
 * @return {object} element
 */
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

/**
 * Method triggered after instance creation.
 */
User.prototype.postInit = function () {

  if (!userInstances.hasOwnProperty(this.username)) {
    userInstances[this.username] = this;
  }
};

/**
 * Get the user username.
 * @return {string} username
 */
User.prototype.getUsername = function () {
  return this.username;
};

/**
 * Get the user display name.
 * @return {string} displayName
 */
User.prototype.getDisplayName = function () {
  if (this.displayName && this.displayName.trim() !== '') {
    return this.displayName;
  }

   return '@' + this.getUsername();
};

/**
 * Get the user representative color.
 * @return {string} color
 */
User.prototype.getAuthorColor = function () {
  if (this.color !== undefined) {
    return this.color;
  }

  this.color = authorColorList.random();
  return this.color;
};

/**
 * Get the current logged in user.
 * @return {promise} userPromise
 */
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

/**
 * Create a new user instance from a payload.
 * @param  {object} data userData
 * @return {object}      userInstance
 */
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

/**
 * Get a user instance based on the payload.
 * Will retrive the user instance if there is one already created
 * on the user list or create a new instance if there is not.
 * @param  {object} user userData
 * @return {object}      userInstance
 */
User.getOrCreate = function (user) {
  if (userInstances.hasOwnProperty(user.username)) {
    return userInstances[user.username];
  }
  return User.createInstance(user);
};


exports = module.exports = User;
