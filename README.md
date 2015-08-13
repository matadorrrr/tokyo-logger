# tokyo-logger
Logging with JST

## install
    npm i tokyo-logger

## example
    //var logger = (require('tokyo-logger')).getLogger();
    //or
    //var logger = (require('tokyo-logger')).getLogger('./example.log');
    //or
    var logger = (require('tokyo-logger')).getLogger({
    	filePath : './example.log',
    	enableConsole : true,
    	dateTimeFormat : 'YYYY/MM/DD HH:mm:ss.SSS'
    });
    
    logger.on('info', function(message, dateTime){
   	  console.log('received info message "' + message + '" on ' + dateTime);
    });
    
    logger.info("message"); // 2015/08/13 14:12:00.0000 :: [info] :: message
