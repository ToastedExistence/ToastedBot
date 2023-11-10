const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test-bot')
		.setDescription('Checks the bots online status'),
	async execute(interaction) {
        await interaction.reply({ content: '**_Checking onling status!_** **BOT STATUS: *ONLINE***', ephemeral: true });
	},
};
