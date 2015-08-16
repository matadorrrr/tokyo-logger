var __tokyoDateTime = require('./tokyo-datetime.js'),
    __fs = require('fs'),
    __emitter = require('events').EventEmitter,
    __util = require('util');
	
var Logger = (function(){
  
  var logger = function(config){
    this.settings = getDefaultLogSetting();
    if((typeof config) == 'object'){
      if(config.filePath)
        this.settings.filePath = config.filePath;
      if(config.enableConsole)
        this.settings.enableConsole = config.enableConsole;
      if(config.dateTimeFormat)
        this.settings.dateTimeFormat = config.dateTimeFormat;
    }
    else if((typeof config) === 'string'){
      this.settings.filePath = config;
    }
    else if(config === undefined){
      this.settings.enableConsole = true;
    }
    else{
      throw new Error('wrong argument');
    }
  };
	
  __util.inherits(logger, __emitter);

  logger.prototype.trace = function(message){
    write(this, 'trace', message);
  };
  
  logger.prototype.debug = function(message){
    write(this, 'debug', message);
  };
  
  logger.prototype.info = function(message){
    write(this, 'info', message);
  };
  
  logger.prototype.warn = function(message){
    write(this, 'warn', message);
  };     
  
  logger.prototype.error = function(message){
    write(this, 'error', message);
  };
  
  logger.prototype.fatal = function(message){
    write(this, 'fatal', message);
  }; 
  
  logger.prototype.write = function(tag, message){
    write(this, tag, message);
  };
  
  function write(self, tag, message){
    var dateTime = __tokyoDateTime.now(self.settings.dateTimeFormat);
    var logMsg = makeLogMessage(dateTime, tag, message);
    if(self.settings.filePath){
      __fs.appendFile(self.settings.filePath, logMsg, function(error){
        if(error) throw error;
      });
    }
    if(self.settings.enableConsole){
      process.stdout.write(logMsg);
    }
    self.emit(tag, message, dateTime);
  };
	
  function makeLogMessage(dateTime, tag, message) {
    return dateTime +' :: [' + tag + '] :: ' + message + '\n';
  };
  
  function getDefaultLogSetting(){
    return JSON.parse(__fs.readFileSync('node_modules/tokyo-logger/settings/defaultLogSetting.json', 'utf8'));
  };
  
  return logger;
})();

module.exports = {
  getLogger : function(config){
    return new Logger(config);
  }
};