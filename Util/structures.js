import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default class Command extends SlashCommandBuilder {
    constructor() {
        super()
        this.exec = () => {
            throw Error(`Command ${this.name} not implemented!`)
        }
    }

    /**
     * @param {(i: ChatInputCommandInteraction) => Promise<unknown>} func 
     * @returns this
     */
    setExecution(func) {
        this.exec = func
        return this
    }
}