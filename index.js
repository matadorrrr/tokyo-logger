var __tokyoDateTime = require('./lib/tokyo-datetime.js'),
    __fs = require('fs'),
    __stream = require('stream'),
    __util = require('util');
	
module.exports = (function(filePath){
    var logger =function(config){
        var config_ = null, 
            argType = typeof config;
			
        try{ config_ = config.get('tokyo-logger'); } catch(e){ }
        
        this.readable = true;
        this.dateTimeFormat = 'YYYY/MM/DD HH:mm:ss.SSS';
		
        if(config_ === null && argType === 'undefined'){
            this.stdout = true;
        }
        else if(config_){
            this.fileName = config_.fileName;
            this.stdout = config_.stdout;
            if(config_.dateTimeFormat){
                this.dateTimeFormat = config_.dateTimeFormat;
            }
        }
        else if(argType === 'string'){
            this.fileName = config;
            this.stdout = false;
        }
        else{
            throw new TypeError('wrong arugment');
        }		
    };
	
    __util.inherits(logger, __stream.Stream);
	
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
