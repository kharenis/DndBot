class Dnd {
	dnd_init(message) {
		this.players = [];
		message.channel.send('DnD game started!');
	};
	dnd_help(message) {
		message.channel.send('DnD Bot Help:');
		message.channel.send('dnd_init - Reset vars and begin a new game');
		message.channel.send('dnd_name <name> - Register your player name');
		message.channel.send('roll <max> <bonus> <# of die> - Rolls dice');
		message.channel.send('hit <armor Class> <Modifiers> - Calculates a hit');
	};
	getPlayer(id) {
		if (this.players)
			return this.players.find(item => item.id === id);
		return null;
	};

	write(message, content) {
		var name = this.getPlayer(message.author.id);
		name = (name) ? name.name : "Name unset";
		message.channel.send(message.author + ' (' + name + '): ' + content);
	};

	roll(message, n = 20, bonus = 0, d = 1) {
		n = parseInt(n);
		bonus = parseInt(bonus);
		d = parseInt(d);
		var randnums = new Array();
		for (var x = 0; x < d; x++) {
			randnums.push(Math.floor((Math.random() * n)) + 1 + bonus);
		}

		this.write(message, 'rolled :game_die: ' + randnums.join(' | :game_die: '));
	};

	hit(message, armorClass = 0, modifiers = 0) {
		var hitCheck = Math.floor((Math.random() * 20) + 1);
		var hit = hitCheck + parseInt(modifiers);
		if (hit >= parseInt(armorClass)) {
			module.exports.write(message, ' Hit success (' + hit + ')')
		} else {
			module.exports.write(message, ' Hit Failed (' + hit + ')')
		}
	};

	dnd_name(message, name) {
		if (name) {
			this.players.push({
				id: message.author.id,
				name: name
			});
			message.channel.send(message.author + ' is playing as ' + name + '!');
		} else
			message.channel.send('No player name provided');
	};
}
module.exports = Dnd;
