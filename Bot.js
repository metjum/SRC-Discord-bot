import "dotenv/config.js";
import { Client, GatewayIntentBits } from 'discord.js'
import { loadEvents, getCommands } from "./Util/loader.js";
import { getNewRuns } from "./Util/runHandler.js";
import { sequelize } from "./Util/db.js";
import { DB } from './Util/db.js'

const Bot = new Client({
    intents: [GatewayIntentBits.Guilds]
})

Bot.once('ready', async () => {
    await sequelize.authenticate()
    await sequelize.sync()

    Bot.commands = await getCommands()
    Bot.runs = await DB.findAll()

    Bot.application.commands.set(Bot.commands.map(c => c.toJSON()))

    await loadEvents(Bot)
    getNewRuns(Bot)
    console.log('Bot Online!')

    Bot.user.setActivity('/track')

    
})

Bot.login(process.env.TOKEN)


