var __tokyoDateTime = require('./lib/tokyo-datetime.js'),
    __fs = require('fs'),
    __emitter = require('events').EventEmitter,
    __util = require('util');
	
module.exports = (function(filePath){

  var logger = function(config){
    var logConfig = null;
    try{ logConfig = config.get('tokyo-logger'); } catch(e){ }
        
    this.dateTimeFormat = 'YYYY/MM/DD HH:mm:ss.SSS';
        
    if((typeof logConfig) === 'Object'){
        if(logConfig.fileName){this.fileName = logConfig.fileName;}
        if(logConfig.stdout){this.stdout = logConfig.stdout;}
        if(logConfig.dateTimeFormat){this.dateTimeFormat = logConfig.dateTimeFormat;}
    }
    else if((typeof config) === "string"){
        this.fileName = config;
        this.stdout = false;
    }
    else if(config === undefined){
        this.stdout = true;
    }
    else{
        throw new Error('wrong argument');
    }
  };
	
  __util.inherits(logger, __emitter);
	
  logger.prototype.write = function(tag, message){
    var dateTime = __tokyoDateTime.get(this.dateTimeFormat);
    var logMsg = makeLogMessage(dateTime, tag, message);
    if(this.fileName){
      __fs.appendFile(this.fileName, logMsg, function(error){
        if(error) throw error;
      });
    }
    if(this.stdout){
      process.stdout.write(logMsg);
    }
    this.emit(tag, message, dateTime);
  };
	
  function makeLogMessage(dateTime, tag, message) {
    return dateTime +' :: [' + tag + '] :: ' + message + '\n';
  }
	
  return logger;
})();
