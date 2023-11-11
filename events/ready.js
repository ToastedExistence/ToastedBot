const { Events } = require('discord.js');
import chalk from 'chalk';

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(Chalk.green.bgBrightBlack.underline(`Beep Boop! Ready! Logged in as ${client.user.tag}`));
	},
};