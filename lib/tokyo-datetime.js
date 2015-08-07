var __moment = require('moment-timezone');

module.exports = {
  get : function(format_){
    return __moment().tz('Asia/Tokyo').format(format_);
  }
};