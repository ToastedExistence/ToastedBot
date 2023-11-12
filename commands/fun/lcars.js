const { SlashCommandBuilder, ChannelType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lcars')
        .setDescription('Access the LCARS computer system!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Select the category that you want to search')
                .setRequired(true)
                .addChoices(
                    { name: 'Science', value: '***SCIENCE COMPUTER FILES***' },
                    { name: 'Engineering', value: '***ENGINEERING COMPUTER FILES***' },
                    { name: 'Tactical', value: '***TACTICAl COMPUTER FILES***' },
                    { name: 'Navigation', value: '***NAVIGATION COMPUTER FILES***' },
                    { name: 'Command', value: '***COMMAND COMPUTER FILES***' },
                )),
        // .addStringOption(option =>
        //     option.setName('username')
        //         .setDescription('Log into your starfleet files')
        //         .setRequired(true)),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        // const username = interaction.options.getString('username');

        await interaction.reply({ content: `## **LOADING:** ${category}`, ephemeral: true});
        await wait(2000);
        // await interaction.editReply(`## **COMPUTER ACCESS GRANTED TO:** ${category}`);
        await interaction.followUp({ content: `**GRANTED ACCESS TO:** ${category} **FOR** ***${interaction.user.username}***`, ephemeral: true});
        console.log(`#COMMAND RUN: ${interaction.user.username} RAN LCARS COMMAND ACCESSING: ${category}`);
    },
};