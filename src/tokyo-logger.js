var __tokyoDateTime = require('./tokyo-datetime.js'),
    __fs = require('fs'),
    __emitter = require('events').EventEmitter,
    __util = require('util');
	
var Logger = (function(){
  
  var LOG_LEVEL = { 'Trace':0, 'Debug':1, 'Info':2, 'Warn':3, 'Error':4, 'Fatal':5 };
  
  var logger = function(config){
    this.settings = getDefaultLogSetting();
    if((typeof config) == 'object'){
      if(config.file.path){
        this.settings.file.path = config.file.path; 
      }
      if(config.file.logLevel){
        this.settings.file.logLevel = LOG_LEVEL[config.file.logLevel];
      }
      if(config.console){
        this.settings.console = config.console;
      }
      if(config.dateTimeFormat){
        this.settings.dateTimeFormat = config.dateTimeFormat;
      }
    }
    else if((typeof config) === 'string'){
      this.settings.file.path = config;
    }
    else if(config === undefined){
      this.settings.console = true;
    }
    else{
      throw new Error('wrong argument');
    }
  };
	
  __util.inherits(logger, __emitter);

  logger.prototype.Trace = function(message){
    write(this, 'Trace', message);
  };
  
  logger.prototype.Debug = function(message){
    write(this, 'Debug', message);
  };
  
  logger.prototype.Info = function(message){
    write(this, 'Info', message);
  };
  
  logger.prototype.Warn = function(message){   
    write(this, 'Warn', message);
  };     
  
  logger.prototype.Error = function(message){
    write(this, 'Error', message);
  };
  
  logger.prototype.Fatal = function(message){
    write(this, 'Fatal', message);
  }; 
  
  logger.prototype.Write = function(tag, message){
    write(this, tag, message);
  };
  
  function write(self, tag, message){
    var dateTime = __tokyoDateTime.now(self.settings.dateTimeFormat);
    var logMsg = makeLogMessage(dateTime, tag, message);
    if(self.settings.file.path){
      if(LOG_LEVEL[tag] === undefined || self.settings.file.logLevel <= LOG_LEVEL[tag]){
        __fs.appendFile(self.settings.file.path, logMsg, function(error){
          if(error) throw error;
        });
      }
    }
    if(self.settings.console){
      process.stdout.write(logMsg);
    }
    self.emit(tag, message, dateTime);
  };
	
  function makeLogMessage(dateTime, tag, message) {
    return dateTime +' :: [' + tag + '] :: ' + message + '\n';
  };
  
  function getDefaultLogSetting(){
    return JSON.parse(__fs.readFileSync('NODE_MODULES/tokyo-logger/settings/defaultLogSetting.json', 'utf8'));
  };
  
  return logger;
})();

module.exports = {
  getLogger : function(config){
    return new Logger(config);
  }
};