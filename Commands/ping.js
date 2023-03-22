import Command from '../Util/structures.js';

export default new Command()
    .setName('ping')
    .setDescription('Displays the current Bot ping.')
    .setExecution(async interaction => {
        interaction.reply({ content: `Bot ping: ${interaction.client.ws.ping}ms`, ephemeral: true })
    })