const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Beep Boop! Ready! Logged in as ${client.user.tag}`);
	},
};