var logger = new (require('./index.js'))('./test.log');

logger.on('info', function(message, dateTime){
	console.log('received info message "' + message + '" on ' + dateTime);
});

logger.write('info', "message");
