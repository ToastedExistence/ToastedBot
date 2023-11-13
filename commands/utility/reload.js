//this is what allows us to make this SlashCommand work, This tells discord.js that we want it to read this files as a SlashCommand, This also tells discord.js that we want to have only some users be able to run this command
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

//this is what allows the following code to work
module.exports = {
	//this is what tells the "SlashCommandBuilder" what our commands information is, Such as name, description, and what permisson level users need to have
	data: new SlashCommandBuilder()
		//this is what sets the commands name
		.setName('reload')
		//this is what sets the commands description
		.setDescription('Reloads a command.')
		//this is what sets the commands permission level, In this command it is set to only users who can manage the bots in the server.
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks)
		//this allows users to choose parts of the command, in this command it allows the user to choose what files they want to access
		//note that this is a "StringOption" meaning it allows users to add or pick a string, In this command it is a open string
		.addStringOption(option =>
			//this sets the name of the option
			option.setName('command')
				//this sets the description for the option
				.setDescription('The command to reload.')
				//this makes it required for the user to choose what they want before they run the command
				.setRequired(true)),

	//this is what allows the following code to work
	async execute(interaction) {
		//this grabs the options from line 16 to line 22 and allows us to pull what choice the user picked and make it lowercase
		const commandName = interaction.options.getString('command', true).toLowerCase();
		//this grabs the options from line 27 and allows us to pull what choice the user picked in a format we can use
		const command = interaction.client.commands.get(commandName);

		//this checks if it can find the command if it cant it logs the error in line 33 and sends the message in line 34
		if (!command) {
			//this logs a error if it can not proceed with the command
			console.log(`there was a error reloading ${commandName} I can not seem to find this command please check spelling`, error)
			//this sends a message if can not proceed with the command
			return interaction.reply(`There is no command with name \`${commandName}\`! Please check spelling!`);
		}

		//this deletes the cache to ensure that there is no duplicates 
		delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

		//this is what allows the following code to work (I am not fully sure about everything in this part of the command)
		try {
			//this attempts to delete the command the user requested from "client.commands"
			interaction.client.commands.delete(command.data.name);
			//this loads the command into the "NewCommand" variable
			const newCommand = require(`../${command.category}/${command.data.name}.js`);
			//this readds the command you requested to "client.commands"
			interaction.client.commands.set(newCommand.data.name, newCommand);
			//this sends a message when the command is run, it sends the information stored in the string
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);

			//this checks for errors in the above statment and logs them in line 56 and sends a message in line 58
		} catch (error) {
			//this logs a error if it can not proceed with the command
			console.error(`error somewhere in line 43 to 56`, error);
			//this sends a message if can not proceed with the command
			await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
		}
	},
};