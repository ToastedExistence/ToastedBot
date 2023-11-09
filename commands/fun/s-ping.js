const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Secret ping')
		.setDescription('Replies only to you with Pong!'),
	async execute(interaction) {
        await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
	},
};