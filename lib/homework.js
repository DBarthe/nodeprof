'use strict'

// this module contains the homework model.

// Create an homework object;
// Properties :
//    - id: the id used by P.R.O.F
//    - name
//    - startDate
//    - endDate
//    - open: boolean (true = open, false = close)
//    - delivery :  boolean
//    - deliveryInfo: undefined if delivery is false 
//          - date
//          - file
module.exports.create = function (options){
  var homework = {
    id: options.id,
    name: options.name,
    startDate: options.startDate,
    endDate: options.endDate,
    open: options.open,
    delivery: options.delivery,
  };
  if (options.delivery){
    homework.deliveryInfo = {
      date: options.deliveryInfo.date,
      file: options.deliveryInfo.file
    };
  }
  return homework;
}

// Return a string that represents the homework.
module.exports.stringOf = function (homework){
  var s = "";

  s += homework.name;

  if (homework.open){
    s += " | until " + homework.endDate;
  }
  else {
    s += " | closed since " + homework.endDate;
  }

  if (homework.delivery){
    s += " | already delivered "
      + homework.deliveryInfo.date
      + " ("+ homework.deliveryInfo.file + ")";
  }

  return s;
}