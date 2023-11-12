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
                    { name: 'Science', value: 'sci' },
                    { name: 'Engineering', value: 'eng' },
                    { name: 'Tactical', value: '***TACTICAl COMPUTER FILES***' },
                    { name: 'Navigation', value: '***NAVIGATION COMPUTER FILES***' },
                    { name: 'Command', value: '***COMMAND COMPUTER FILES***' },
                )),

    async execute(interaction) {
        const category = interaction.options.getString('category');

        //fileres is the first response that get sent to the user
        let fileres = ''
       //fileacc is the second response that get sent to the user allowing the user to access the proper files they requested
        let fileacc = ''

        if (category === 'sci') { 
            fileres = '***SCIENCE COMPUTER FILES***'    
            fileacc = '***(SCIENCE COMPUTER FILES)[]***'
        }


        await interaction.reply({ content: `## **LOADING:** ${fileres}`, ephemeral: true });
        await wait(2000);

        if (category === '***SCIENCE COMPUTER FILES***') { 
            await interaction.followUp({ content: `ur mum`, ephemeral: true });
        }

        await interaction.followUp({ content: `**GRANTED ACCESS TO:** ${fileacc} **FOR** ***${interaction.user.username}***`, ephemeral: true });
        // await interaction.followUp({ content: `******`, ephemeral: true });
        console.log(`#COMMAND RUN: ${interaction.user.username} RAN LCARS COMMAND ACCESSING: ${category}`);
    },
};