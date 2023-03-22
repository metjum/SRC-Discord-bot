export const name = 'interactionCreate';
export async function run(interaction) {
    const cmd = interaction.client.commands.get(interaction.commandName);
    if (!cmd || !interaction.guild)
        return;

    cmd.exec(interaction)
        .catch(err => {
            console.error(err);

            let errMsg = { content: 'Sorry, there was an error while executing the command :(', ephemeral: true };

            if (interaction.replied || interaction.deferred)
                interaction.editReply(errMsg).catch(() => { });
            else
                interaction.reply(errMsg).catch(() => { });
        });
}
