//this is what allows us to make this SlashCommand work, This tells discord.js that we want it to read this files as a SlashCommand, This also tells discord.js that we want to have only some users be able to run this command
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

//this is what allows the following code to work
module.exports = {
	//this is what tells the "SlashCommandBuilder" what our commands information is, Such as name, description, and what permisson level users need to have	
	data: new SlashCommandBuilder()
		//this is what sets the commands name
		.setName('prune')
		//this is what sets the commands description
		.setDescription('Prune up to 99 messages.')
		//this is what sets the commands permission level, In this command it is set to only users who can remove messages in the server
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		//this allows users to choose parts of the command, in this command it allows the user to choose how many messges they want to remove
		//note that this is a "IntergerOption" meaning it allows users to set a number or pick from a preset amount, In this command it is set to 1 to 99
		.addIntegerOption(option =>
			//this sets the name of the option
			option.setName('amount')
				//this sets the description for the option
				.setDescription('Number of messages to prune')
				//this makes it required for the user to choose what they want before they run the command
				.setRequired(true)),

	//this is what allows the following code to work		
	async execute(interaction) {
		//this grabs the number chosen in line 16 to line 22 and allows us to pull then number they choose
		const amount = interaction.options.getInteger('amount');


		//this checks if the number is below 1 or above 99, if it does not fall inbetween 1 to 99 it sends the error labeled in line 33
		if (amount < 1 || amount > 99) {
			//this sends a message if the above statement is true, see line 30
			return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true });
		}

		//this checks if it can delete the message if it cant it logs the error in line 39 and sends the message in line 41
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			//this logs a error if it can not proceed with the command
			console.error('there was a error removing messages');
			//this sends a message if can not proceed with the command
			interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
		});
		//this sends a message only to the user if the command worked as expected
		return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true });
	},
};