//var logger = (require('tokyo-logger')).getLogger();
//or
//var logger = (require('tokyo-logger')).getLogger('./example.log');
//or
var logger = (require('tokyo-logger')).getLogger({
	filePath : './example.log',
	enableConsole : true,
	dateTimeFormat : 'YYYYMMDDHHmmss'
});

logger.on('info', function(message, dateTime){
	console.log('received info message "' + message + '" on ' + dateTime);
});

logger.info("message");