'use strict'

var assert = require('assert');

var userInput = require('./user-input'),
    httpClient = require('./http-client'),
    htmlParser = require('./html-parser'),
    courseUnit = require('./course-unit');

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
  assert.notEqual(typeof data, "undefined", "forgotten parameter");
  return function (){
    var err = arguments[0];
    if (typeof err !== 'undefined' && err !== null && err !== false) {
      throw err;
    }
    arguments[0] = data;
    f.apply(undefined, arguments);
  }
}

// the next functions are called in cascade, from top to bottom.

function askUsername(my, username){
  my.username = username;
  userInput.askPassword({}, callback(askPassword, my));
}

function askPassword(my, password){
  my.password = password;
  httpClient.login(my, callback(login, my));
}

function login(my){
  console.log('authentification success');
  httpClient.fetchCourseUnitList(callback(fetchCourseUnitList, my));
}

function fetchCourseUnitList(my, html){
  htmlParser.parseCourseUnitList(html, callback(parseCourseUnitList, my));
}

function parseCourseUnitList(my, courseUnitList){
  my.cuList = courseUnitList;

  if (courseUnitList.length === 0){
    return console.log("no course unit available for you.");
  }

  userInput.askSelect(
    {
      list: courseUnitList,
      show: courseUnit.stringOf,
      text: "available course units:"
    },
    callback(selectCourseUnit, my)
  );
}

function selectCourseUnit(my, cuSelected){
  my.cuSelected = cuSelected;

  httpClient.fetchHomeworkList(
    { courseUnitId: cuSelected.id },
    callback(fetchHomeworkList, my)
  );
}

function fetchHomeworkList(my, html){
  htmlParser.parseHomeworkList(html, callback(parseHomeworkList, my));
}

function parseHomeworkList(my, homeworkList){
  my.homeworkList = homeworkList;

  if (homeworkList.length === 0){
    return console.log("no homework available for the course unit '"
      + courseUnit.stringOf(my.cuSelected) + "'");
  }

  console.log(homeworkList);
}