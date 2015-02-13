'use strict'

// This module parses html pages and builds useful data structures.

var jsdom = require('jsdom');

var courseUnit = require('./course-unit'),
    homework = require('./homework');

// parse the html that must contains the course unit list page.
// callback(err, courseUnitList). courseUnitList is an array of
//  CourseUnit obects.
module.exports.parseCourseUnitList = function (html, callback){

  jsdom.env(
    html, [],
    function(errors, window){

      if (errors) return callback(errors);

      var courseUnitList = [],
          elements = window.document.getElementsByTagName('option');

      for (var i = 0; i < elements.length; i += 1){
        var elt = elements[i];
        courseUnitList.push(courseUnit.create({ id: elt.value, name: elt.text }));
      }

      window.close();

      callback(undefined, courseUnitList);
    }
  );
}

// parse the html that must contains an homework list page.
// callback(err, homework). courseUnitList is an array of
//  Homework obects.
module.exports.parseHomeworkList = function (html, callback){

  jsdom.env(
    html, [],
    function (errors, window){
      if (errors) return callback(errors);

      var homeworkList = [],
          rows = window.document.getElementsByTagName('tr');

      for (var i = 0; i < rows.length; i += 1){
        var row = rows[i];

        if (row.id !== 'invert2') continue;

        var homeworkOptions = {
          id: /id_echeance=(\d+)/.exec(row.children[0].children[0].href)[1],
          name: row.children[0].textContent,
          startDate: row.children[1].textContent,
          endDate: row.children[2].textContent,
          open: row.children[3].textContent === 'Ouvert',
          delivery: row.children[4].textContent !== 'Non'
        };

        if (homeworkOptions.delivery){
          var execResult = /Le (.*) \((.*)\)/.exec(row.children[4].textContent);
          homeworkOptions.deliveryInfo = {
            date: execResult[1],
            file: execResult[2]
          };
        }

        homeworkList.push(homework.create(homeworkOptions));
      }

      window.close();

      callback(undefined,  homeworkList);
    }
  );
}
