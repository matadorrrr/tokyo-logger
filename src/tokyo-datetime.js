var __moment = require('moment-timezone');

module.exports = {
  now : function(format_){
    return __moment().tz('Asia/Tokyo').format(format_); 
  }
};