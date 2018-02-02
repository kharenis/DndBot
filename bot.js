const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

var dnd_ext = require('./dnd.js');
var dnd = new dnd_ext();
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client();

bot.login(auth.token);

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as ' + bot.user.username);
});
bot.on('message', function (message) {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`

	var user = message.author;
	var channel = message.channel;
	var content = message.content;

	logger.info(content);

	var params = message.content.split(' ').filter(x => x);
	if (params[0] && params[0].substring(0, 1) == '!') {
		var cmd = params[0].replace('!', '');
		var args = params.splice(1);

		if (dnd[cmd]) {
			dnd[cmd](message, ...args);
		} else
			message.channel.send('Command does not exist!');
	}

});
