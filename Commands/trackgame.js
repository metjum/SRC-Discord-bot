import Command from '../Util/structures.js';
import { DB } from '../Util/db.js'
import { PermissionsBitField } from 'discord.js';
import { getGame } from '../Util/runHandler.js';

export default new Command()
    .setName('trackgame')
    .setDescription('Tracks a new game.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption(option =>
        option.setName('game')
            .setDescription('The name of the game, be as precise as possible')
            .setRequired(true)
    )
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('The channel where the alert is going to be sent.')
            .setRequired(true)
    )
    .setExecution(async interaction => {
        let game = interaction.options.getString('game')
        let channel = interaction.options.getChannel('channel')

        let gameData = await getGame(game)

        if (!gameData || gameData.length == 0) return interaction.reply({ content: 'Game not found! Please make sure that the name provided matches the URL of the game\n\n For example, the name for the game **Atomic Heart** would be \`atomic_heart\` as displayed in the URL <https://www.speedrun.com/atomic_heart>', ephemeral: true })

        let already = await DB.findOne({ where: { channel: channel.id, gameid: gameData[0].id } })

        if (already) return interaction.reply({ content: 'The game is already being tracked on that channel', ephemeral: true })

        await DB.create({
            channel: channel.id,
            gameid: gameData[0].id
        })

        let games = interaction.client.games

        if (games[gameData[0].id]) games[gameData[0].id].channels.push(channel.id)
        else games[gameData[0].id] = {
            lastId: null,
            lastDate: null,
            channels: [channel.id]
        }

        interaction.reply({ content: `New verified runs for **${gameData[0].names.international}** are being tracked in ${channel}` })
    })