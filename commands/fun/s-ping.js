const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret ping')
		.setDescription('Replies to you only with Pong!'),
	async execute(interaction) {
        await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
	},
};