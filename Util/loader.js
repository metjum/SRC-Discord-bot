import { Collection } from 'discord.js'
import { readdirSync } from 'fs'

export async function getCommands() {
    const Commands = new Collection()
    for (let file of readdirSync('./Commands/')) {
        let { default: cmd } = await import(`../Commands/${file}`)
        Commands.set(cmd.name, cmd)
    }
    return Commands
}
export async function loadEvents(Bot) {
    for (let file of readdirSync('./Events/')) {
        let { name, run } = await import(`../Events/${file}`)
        Bot.on(name, (...args) => run(...args))
    }
}