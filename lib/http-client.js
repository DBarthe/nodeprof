'use strict'

// This module is used to perform all the http requests needed.

var request = require('request');

var baseURL = 'https://prof.fil.univ-lille1.fr/';


// Authentificate on the P.R.O.F plateform.
// This function has to be called one time, before processing
//  others requests.
// options properties:
//    - username
//    - password
// callback(err).
module.exports.login = function (options, callback){

  var reqOptions = {
    url: baseURL + 'login.php',
    form: {
      login: options.username,
      passwd: options.password
    },
    jar: true,
    followRedirect: false
  };

  request.post(reqOptions, function(err, response, body){

    if (err) {
      callback(err);
    }
    else if (response.statusCode != 302){
      return callback('Authentification failure: wrong login or password');
    }
    else {
      callback(undefined);
    }
  });
}

// Get the html page that contains the course unit list.
// callback(err, htmlPage).
module.exports.fetchCourseUnitList = function (callback){

  var reqOptions = {
    url: baseURL + 'select_projet.php',
    jar: true,
    followRedirect: false
  };

  request.get(reqOptions, function(err, response, body){

    if (err) {
      callback(err);
    }
    else if (response.statusCode === 302){
      return callback('Error: maybe the session is expired');
    }
    else if (response.statusCode !== 200){
      return callback('Error: status code is ' + response.statusCode);
    }
    else {
      callback(undefined, body);
    }
  });
}

// Get the html page that contains the course unit list.
// options properties:
//    - courseUnitId: the id of the course unit.
// callback(err, htmlPage).
module.exports.fetchHomeworkList = function (options, callback){

  var reqOptions = {
    url: baseURL + 'main.php',
    jar: true,
    followRedirect: false,
    form: {
      id_projet: options.courseUnitId
    }
  };

  request.post(reqOptions, function(err, response, body){

    if (err) {
      callback(err);
    }
    else if (response.statusCode === 302){
      return callback('Error: maybe the session is expired');
    }
    else if (response.statusCode !== 200){
      return callback('Error: status code is ' + response.statusCode);
    }
    else {
      callback(undefined, body);
    }
  });

}

// Upload a homework.
// options properties:
//    - homeworkId: the id of the homework to deliver.
//    - path: pathname of the file to send.
// callback(err)
module.exports.uploadFile =  function (options, callback){
}

// Check if the current session is still logged.
// callback(err, logged). logged is a boolean.
module.exports.isLogged = function (callback){
}