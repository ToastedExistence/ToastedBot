//this is what allows us to make this SlashCommand work, This tells discord.js that we want it to read this files as a SlashCommand, This also tells discord.js that we want to have only some users be able to run this command
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

//this is what allows the following code to work
module.exports = {
	//this is what tells the "SlashCommandBuilder" what our commands information is, Such as name, description, options, if it can be used in dms, and what permisson level users need to have	
	data: new SlashCommandBuilder()
		//this is what sets the commands name	
		.setName('ban')
		//this is what sets the commands description
		.setDescription('Select a member and ban them.')
		//this is what sets the commands permission level, In this command it is set to only users who can ban members in the server
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		//this is what sets if you can use it in dms or not, In this command we have it set to false meaning you can only use it in the server
		.setDMPermission(false)
		//this allows users to choose parts of the command, in this command it allows the user to choose who they want to ban
		//note that this is a "UserOption" meaning it selects a user in the server
		.addUserOption(option =>
			//this sets the name of the option
			option.setName('target')
				//this sets the description for the option
				.setDescription('The member to ban')
				//this makes it required for the user to choose what they want before they run the command
				.setRequired(true))
		//this allows users to choose parts of the command, in this command it allows the user to set the reason they are banning the target
		//note that this is a "StringOption" meaning it allows users to add or pick a string, In this command it is a open string
		.addStringOption(option =>
			//this sets the name of the option
			option.setName('reason')
				//this sets the description for the option
				.setDescription('The reason for banning')
				//this makes it required for the user to choose what they want before they run the command
				.setRequired(true)),

	//this is what allows the following code to work
	async execute(interaction) {
		//this grabs the target from line 17 to line 23 and allows us to pull who the user picked
		const target = interaction.options.getUser('target');
		//this grabs the info from line 8 to line 18 and allows us to add the reason they banned the member to the message
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		//this sends a message when the command is run, it sends the information stored in the string
		await interaction.reply(`# **Banning** ${target.username} **for reason:** ${reason}`);
		//this bans the target for the reason set and pulled in line 37
		await interaction.guild.members.ban(target);
	},
};
