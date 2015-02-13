'use strict'

// This module contains the course unit model.

// Create a course unit object.
// Properties:
//   - id : id used by P.R.O.F
//   - name
module.exports.create = function (options){
  return {
    id: options.id,
    name: options.name
  };
}

// Return a string that represents the courseUnit.
module.exports.stringOf = function (courseUnit){
  return courseUnit.name;
}