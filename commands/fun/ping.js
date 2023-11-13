//this is what allows us to make this SlashCommand work, This tells discord.js that we want it to read this files as a SlashCommand, This also tells discord.js that we want to have only some users be able to run this command
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

//this is what allows the following code to work
module.exports = {
	//this is what tells the "SlashCommandBuilder" what our commands information is, Such as name, description, and what permisson level users need to have	
	data: new SlashCommandBuilder()
		//this is what sets the commands name
		.setName('ping')
		//this is what sets the commands description
		.setDescription('Replies with Pong!')
		//this is what sets the commands permission level, In this command it is set to only users who can manage the bots in the server
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks),

	//this is what allows the following code to work
	async execute(interaction) {

		//this sends a message when the command is run, it sends the information stored in the string
		await interaction.reply('Pong!');
	},
};