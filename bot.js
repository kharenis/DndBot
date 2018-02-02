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
    logger.info('Logged in as: ');
	logger.info('Logged in as'+ bot.user.username);
});
bot.on('message', function (message) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	var user = message.author;
	var channel = message.channel;
	var content = message.content;
	
	logger.info(content);
	
	var params = message.content.split(' ').filter( x => x);
	if(params[0] && params[0].substring(0, 1) == '!')
	{
		var cmd = params[0].replace('!', '');
		var args = params.splice(1);
		
		if(dnd[cmd])
		{		
	dnd[cmd](message, ...args);
	return;
	
	
			if(args.length > 0)
			dnd[cmd].apply(message, args);
		else
			dnd[cmd](message);
		}
		else
			message.channel.send('Command does not exist!');
		
	}
	return;
	
    if (content.substring(0, 1) == '!') {
		var args = content.split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		
		
		if(dnd[cmd])
		{
			
			if(args.length > 0)
			dnd[cmd].apply(message, args);
		else
			dnd[cmd](message);
		}
		else
			message.channel.send('Command does not exist!');

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channel.Id,
                    message: 'Pong!'
                });
				break;
				case "!roll":
				var d = 1;
				var n = 20;
				var b = 0;
				
				logger.info(args);
				
				if(args[0])
					d = args[0];
				if(args[1])
					n = args[1];
				if(args[2])
					b = args[2];
				
				message.channel.send('@'+user.username+ ' rolled ' +dnd.roll(d, n, b));
				/*
				bot.sendMessage(
				{
					to: channel.Id,
					message: user.username+ ' rolled ' +dnd.roll(1, 20, 0)
				});*/
            break;
			case "!hit":
			message.channel.send(dnd.hit(0, 13));
			break;
            // Just add any case commands if you want to..
         }
     }
});