'use strict'

/*
 * This module is intended to contains functions that perform I/O
 * on stdout and stdin to collect user inputs such as passwords,
 * filenames, ...
 * These functions are in charge of presenting human-readable informations,
 * and get back user responses.
 */

var read = require('read');

// Ask for the user password.
//
// options properties:
//   - default : the default value if input is empty
//
// callback(err, password)
module.exports.askPassword = function (options, callback){
  read(
    {
      prompt: 'password:',
      silent: true,
      replace: '*',
      default: options.default
    },
    callback
  );
}

// Ask for the username.
//
// options properties:
//   - default : the default value if input is empty
//
// callback(err, username)
module.exports.askUsername = function (options, callback){
  read(
    {
      prompt: 'username:',
      default: options.default
    },
    callback
  );
}

// Ask for a file or folder path. Maybe use auto-completion.
//
// options properties:
//   - default : the default value if input is empty
//
// callback(err, pathname)
module.exports.askPath = function (options, callback){
}

// Ask for a choice of an item into a list.
// Display the list with one number by item, and ask for a number.
//
// options properties:
//   - list: the list in which select the item (objet or array)
//   - default: the default value if input is empty
//   - show: a custom function that takes an item and returns a string.
//
// callback(err, itemSelected)
module.exports.askSelect = function (options, callback){
}