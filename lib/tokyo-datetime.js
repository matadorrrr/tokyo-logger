var __moment = require('moment-timezone');

module.exports = {
  get : function(format_){
    return format_? __moment().tz('Asia/Tokyo').format(format_) : null; 
  }
};