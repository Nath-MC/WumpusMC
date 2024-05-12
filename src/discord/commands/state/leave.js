const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect the bot from the server"),

  /** *
   *  @param {CommandInteraction} interaction
   */

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    if (!interaction.client.botUsers.has(interaction.user.id)) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("No bot running !")
            .setColor([255, 0, 0]),
        ],
      });
    } else {
      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Leaving the game...")
            .setColor([255, 255, 0]),
        ],
      });

      interaction.client.botUsers.get(interaction.user.id).quit()
        .then((client) => {
          interaction.client.botUsers.delete(interaction.user.id);
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`${client.username} left the game`)
                .setColor([0, 255, 0]),
            ],
          });
        }, (reason) => {
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Something wrong happened !")
                .setDescription(`\`\`\`\n${reason}\n\`\`\``)
                .setColor([255, 0, 0]),
            ],
          });
        });
    }
  },
};
