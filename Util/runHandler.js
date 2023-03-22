import { writeFileSync, readFileSync } from 'node:fs'
import axios from 'axios'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const runsURL = `https://www.speedrun.com/api/v1/runs?orderby=verify-date&direction=desc&status=verified`
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getGame(name) {
    let res = await axios.get(`https://www.speedrun.com/api/v1/games?abbreviation=${name}`).catch(console.error)

    return res?.data?.data
}

let lastRun = JSON.parse(readFileSync(join(__dirname, '../Data/lastRunChecked.json')))
export async function getNewRuns(Bot) {

    let runs = {}

    for (let run of Bot.runs) {
        if (runs[run.gameid]) runs[run.gameid].push(run.channel)
        else runs[run.gameid] = [run.channel]
    }

    let res = await axios.get(runsURL).catch(console.error)

    let tosend = []

    for (let run of res.data.data) {
        if (lastRun.id == null) break;
        if (run.id == lastRun.id) break;

        if (runs[run.game]) tosend.push({
            channels: runs[run.game],
            text: `New **${gameData[0].names.international}** run has been verified!\n${run.weblink}`
        })

        if (lastRun.id == null) break;
    }

    lastRun.id = res.data.data[0].id
    writeFileSync(join(__dirname, '../Data/lastRunChecked.json'), JSON.stringify(lastRun, null, 1))

    if (tosend.length !== 0) {

        for (let send of tosend.reverse()) {
            for (let channelID of send.channels) {
                let channel = Bot.channels.resolve(channelID)
                if (channel) channel.send(send.text).catch(console.error)
            }
        }
    }

    await wait(1000)
    getNewRuns(Bot)
}