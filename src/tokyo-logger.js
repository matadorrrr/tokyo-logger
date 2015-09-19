var tokyoDateTime = require('./tokyo-datetime.js')
  , fs = require('fs')
  , emitter = require('events').EventEmitter
  , util = require('util');
	
var Logger = (function(){
  var LOG_LEVEL = { 
      'Trace' : 0, 
      'Debug' : 1, 
      'Info'  : 2, 
      'Warn'  : 3, 
      'Error' : 4, 
      'Fatal' : 5    
  };
  var logger = function(config){  
    this.settings = JSON.parse(fs.readFileSync(
      __dirname + '/../settings/defaultLogSetting.json', 'utf8')
    );  
    switch (typeof config) {
      case 'object':
        if(config.file){
          if(config.file.path){
            this.settings.file.path = config.file.path; 
          }
          if(config.file.logLevel){
            this.settings.file.logLevel = LOG_LEVEL[config.file.logLevel];
          }
        }
        if(config.console){
          this.settings.console = config.console;
        }
        if(config.dateTimeFormat){
          this.settings.dateTimeFormat = config.dateTimeFormat;
        }
        if(config.logFormat){
          this.settings.logFormat = config.logFormat + '\n';
        }
        break;
      case 'string': this.settings.file.path = config; break;
      default: this.settings.console = true; break;
    }
  };
	
  util.inherits(logger, emitter);

  logger.prototype.Trace = function(message){
    write.call(this, 'Trace', message);
  };
  
  logger.prototype.Debug = function(message){
    write.call(this, 'Debug', message);
  };
  
  logger.prototype.Info = function(message){
    write.call(this, 'Info', message);
  };
  
  logger.prototype.Warn = function(message){   
    write.call(this, 'Warn', message);
  };     
  
  logger.prototype.Error = function(message){
    write.call(this, 'Error', message);
  };
  
  logger.prototype.Fatal = function(message){
    write.call(this, 'Fatal', message);
  }; 
  
  logger.prototype.Write = function(tag, message){
    write.call(this, tag, message);
  };
  
  function write(tag, message){
    var dateTime = tokyoDateTime.now(this.settings.dateTimeFormat);
    var logMsg = util.format(this.settings.logFormat, dateTime, tag, message);
    if(this.settings.file.path){
      if(LOG_LEVEL[tag] === undefined ||
         this.settings.file.logLevel <= LOG_LEVEL[tag]){
        fs.appendFile(this.settings.file.path, logMsg, function(error){
          if(error) throw error;
        });
      }
    }
    if(this.settings.console){
      process.stdout.write(logMsg);
    }
    this.emit(tag, message, dateTime);
  };
  
  return logger;
})();

module.exports = {
  getLogger : function(config){
    return new Logger(config);
  }
};