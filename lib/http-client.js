'use strict'

// This module is used to perform all the http requests needed.


// Authentificate on the P.R.O.F plateform.
// This function has to be called one time, before processing
//  others requests.
// options properties:
//    - username
//    - password
// callback(err).
module.exports.login = function (options, callback){
}

// Get the html page that contains the course unit list.
// callback(err, htmlPage).
 module.exports.fetchCourseUnitList = function (callback){
}

// Get the html page that contains the course unit list.
// options properties:
//    - courseUnitId: the id of the course unit.
// callback(err, htmlPage).
module.exports.fetchHomeworkList = function (options, callback){
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