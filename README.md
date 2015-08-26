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
	file : {
		path : './example.log',
		logLevel : 'Warn'
	},
	console : true,
	dateTimeFormat : 'YYYY/MM/DD HH:mm:ss.SSS' // is default.
});

logger.on('Error', function(message, dateTime){
    // Do something.
});
    
logger.Error('my message'); // 2015/08/13 14:12:00.0000 :: [Error] :: my message
```
methods
```js
logger.Trace(message);
logger.Debug(message);
logger.Info(message);
logger.Warn(message);
logger.Error(message);
logger.Fatal(message);
logger.Write(tag, message);
```
