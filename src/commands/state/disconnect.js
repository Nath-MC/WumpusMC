const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { deconnectClient } = require("../../../mineflayer/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Make the bot leave the joined server"),

  /** *
   *  @param {CommandInteraction} interaction
   */

  async execute(interaction) {
    const mcClient = interaction.client.botUsers.get(interaction.user.id);

    //Interaction response delay deferred
    console.log("Interaction response delay deferred");
    await interaction.deferReply({ ephemeral: true });

    if (!mcClient) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("No bot running !")
            .setColor([255, 0, 0]),
        ],
      });
    }

    interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Leaving the game...")
          .setColor([255, 255, 0]),
      ],
    });

    deconnectClient(mcClient)
      .then((client) => {
        interaction.client.botUsers.delete(interaction.user.id);
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${client.username} left the game`)
              .setColor([0, 255, 0]),
          ],
        });
      })
      .catch((reason) => {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Something wrong happended !")
              .setDescription(`\`\`\`\n${reason}\n\`\`\``)
              .setColor([255, 0, 0]),
          ],
        });
      });
  },
};
