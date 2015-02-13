'use strict'

/*
 * This module is intended to contains functions that perform I/O
 * on stdout and stdin to collect user inputs such as passwords,
 * filenames, ...
 * These functions are in charge of presenting human-readable informations,
 * and get back user responses.
 */

var read = require('read'),
    assert = require('assert');

// Ask for the user password.
//
// options properties:
//   - default : the default value if input is empty (optional)
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
//   - default : the default value if input is empty (optional)
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
//   - default : the default value if input is empty (optional)
//
// callback(err, pathname)
module.exports.askPath = function (options, callback){
}

// Ask for a choice of an item into a list.
// Display the list with one number by item, and ask for a number.
//
// options properties:
//   - list: the list in which select the item (objet or array)
//   - default: the default value if input is empty (optional)
//   - show: a custom function that takes an item and returns a string.
//   - text: the text that introduce the list
//
// callback(err, itemSelected)
module.exports.askSelect = function (options, callback){

  assert.notEqual(options.list.length, 0, "Choice list must be larger than 0");

  function aux(){

    console.log(options.text);
    for (var i = 0; i < options.list.length; i += 1){
      console.log("  " + (i + 1) + ") " + options.show(options.list[i]));
    }

    var def = typeof options.default === 'undefined'
      ? undefined
      : options.show(options.default);

    read(
      {
        prompt: "select an item:",
        default: def,
      },
      function (err, input, is_default){
        if (err) return callback(err);

        if (typeof options.default !== 'undefined' && is_default){
          return callback(undefined, options.default);
        }

        var choiceNum = Number(input);

        if (isNaN(choiceNum)){
          console.log("please, enter a number");
          return aux();
        }

        if (choiceNum <= 0 || choiceNum > options.list.length){
          console.log('the choice must be between 1 and ' + options.list.length);
          return aux();
        }

        callback(undefined, options.list[choiceNum - 1]);
      }
    );
  }

  aux();
}