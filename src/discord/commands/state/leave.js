const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const UserRegister = require("../../../mineflayer/UserRegister");
const { deconnectClient } = require("../../../mineflayer/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect the bot from the server"),

  /** *
   *  @param {CommandInteraction} interaction
   */

  async execute(interaction) {

    await interaction.deferReply({ ephemeral: true });

    if (!UserRegister.has(interaction.user.id)) {
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

      deconnectClient(UserRegister.get(interaction.user.id))
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
                .setTitle("Something wrong happended !")
                .setDescription(`\`\`\`\n${reason}\n\`\`\``)
                .setColor([255, 0, 0]),
            ],
          });
        });
    }
  },
};
