module.exports = {
	players: [],
	
	getPlayer: function (id)
	{
		return module.exports.players.find(item => item.id === id);
	},
	
	write: function(message, content)
	{
		var name = module.exports.getPlayer(message.author.id);
		name = (name) ? name.name : "Name unset";
		message.channel.send(message.author + ' ('+name+'): '+content);
	},
	
	roll: function(message, n = 20, bonus = 0, d = 1){		
		var randnums = new Array();
		for(var x = 0; x < d; x++)
		{
			randnums.push(Math.floor((Math.random() * n) + 1 + bonus));
		}
		
		module.exports.write(message, 'rolled :game_die: '+randnums.join(' | :game_die: '));
	},
	
	hit: function(message, armorClass = 0, modifiers = 0)
	{		
		var hitCheck = Math.floor((Math.random() * 20) + 1);
		var hit = hitCheck + parseInt(modifiers);
		if(hit >= parseInt(armorClass))
		{
			module.exports.write(message, ' Hit success ('+hit+')')
		}
		else
		{
			module.exports.write(message, ' Hit Failed ('+hit+')')
		}
	},
	
	dnd_register: function(message, name)
	{
		if(name)
		{
			module.exports.players.push({id: message.author.id, name: name});
			message.channel.send(message.author+ ' is playing as '+name+'!');
		}
		else
			message.channel.send('No player name provided');
	},
	
	dnd_init: function(message)
	{
		module.exports.players = [];
		message.channel.send('DnD game started!');
	},
	
	dnd_help: function(message)
	{
		message.channel.send('DnD Bot Help:');
		message.channel.send('dnd_init - Reset vars and begin a new game');
		message.channel.send('dnd_register <name> - Register your player name');
		message.channel.send('roll <max> <bonus> <# of die> - Rolls dice');
		message.channel.send('hit <armor Class> <Modifiers> - Calculates a hit');
	}
};