# tokyo-logger
Logging with JST

## install
    npm i tokyo-logger

## example
```js
//var logger = (require('tokyo-logger')).getLogger();
//or
//var logger = (require('tokyo-logger')).getLogger('./example.log');
//or
var logger = (require('tokyo-logger')).getLogger({
	filePath : './example.log',
	enableConsole : true,
	dateTimeFormat : 'YYYY/MM/DD HH:mm:ss.SSS' // is default.
});

logger.on('error', function(message, dateTime){
    //something
});
    
logger.error('myMessage'); // 2015/08/13 14:12:00.0000 :: [error] :: myMessage
```
method
```js
logger.trace(message);
logger.debug(message);
logger.info(message);
logger.warn(message);
logger.error(message);
logger.fatal(message);
logger.write(tag, message);
```
