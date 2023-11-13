//this is what allows us to make this SlashCommand work, This tells discord.js that we want it to read this files as a SlashCommand
const { SlashCommandBuilder } = require('discord.js');

//this is what allows the following code to work
module.exports = {
	//this is what tells the "SlashCommandBuilder" what our commands information is, Such as name, description, and any options	
	data: new SlashCommandBuilder()
		//this is what sets the commands name
		.setName('avatar')
		//this is what sets the commands description
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		//this allows users to choose parts of the command, in this command it allows the user to choose who they want the bot to get the profile photo of
		//note that this is a "UserOption" meaning it selects a user in the server
		.addUserOption(option =>
			//this sets the name of the option
			option.setName('target')
				//this sets the description for the option
				.setDescription('The user\'s avatar to show')),

	//this is what allows the following code to work
	async execute(interaction) {
		//this grabs the target from line 14 to line 21 and allows us to pull who the user picked
		const user = interaction.options.getUser('target');
		//this sends a message when the command is run, it sends the information stored in the string in this command it sends a image
		//this is the command for the user you choose
		if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL()}`);
		//this sends a message when the command is run, it sends the information stored in the string in this command it sends a image
		//this is the message for if you want to get your own profile photo
		return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
	},
};