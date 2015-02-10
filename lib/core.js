'use strict'

var userInput = require('./user-input'),
    httpClient = require('./http-client');


/*
 * This is the main function of the project.
 * Commands and manages all the others modules in order
 * to perform what the user wants.
 * That means :
 *      - ask for username and password
 *      - authentification on P.R.O.F.
 *      - fetch then parse the course unit list page
 *      - ask for course unit selection
 *      - fetch then parse the homework list page associated with the course unit
 *      - ask for homework selection
 *      - ask for folder/file to upload
 *      - ask for compression format and archive name
 *      - compress the file/folder
 *      - upload the compressed file.
 */
module.exports.run = function(){

  var my = {};

  userInput.askUsername(
    { default: process.env['USER'] },
    callback(askUsername, my)
  );
}

// shortcut for callback: manage errors and callback parameter.
function callback(f, data){
  return function (){
    var err = arguments[0];
    if (typeof err !== 'undefined' && err !== null && err !== false) {
      throw err;
    }
    arguments[0] = data;
    f.apply(undefined, arguments);
  }
}

function askUsername(my, username){
  my.username = username;
  userInput.askPassword({}, callback(askPassword, my));
}

function askPassword(my, password){
  my.password = password;

  httpClient.login(my, callback(login, my));
}

function login(my){
  console.log('Authentification success');

  httpClient.fetchCourseUnitList(callback(fetchCourseUnitList));
}

function fetchCourseUnitList(my, htmlPage){
  console.log(htmlPage);
}