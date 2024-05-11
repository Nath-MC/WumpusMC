const {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const { message } = require("../../../mineflayer/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("message")
    .setDescription("Sends a message in the chat/to a player")
    .addStringOption((args) =>
      args
        .setName("message")
        .setDescription("The in-game sent message/command")
        .setRequired(true)
    )
    .addStringOption((args) =>
      args
        .setName("player")
        .setDescription("The name of the player you want to whisper to")
    ),

  /**
   *
   * @param {CommandInteraction} interaction
   */

  async execute(interaction) {
    const mcClient = interaction.client.botUsers.get(interaction.user.id);

    if (!mcClient) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setTitle("No bot running !").setColor([255, 0, 0]),
        ],
        ephemeral: true,
      });
    }
    const msg = interaction.options.getString("message");
    const player = interaction.options.getString("player");
    await message(
      mcClient,
      msg,
      player
    );
    if (!player) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              `${
                mcClient.username
              } said : "${msg}".`
            )
            .setColor("NotQuiteBlack"),
        ],
        ephemeral: true,
      });
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              `${
                mcClient.username
              } whispered : "${msg}" to ${player}.`
            )
            .setColor("NotQuiteBlack"),
        ],
        ephemeral: true,
      });
    }
  },
};
