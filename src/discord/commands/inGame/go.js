const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require("discord.js");
const { updateGoal } = require("../../../mineflayer/Client");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("go")
    .setDescription("Move the bot to the xyz coords or the player's ones")
    .addStringOption((args) => args.setName("xyz").setDescription("The desired coordinates"))
    .addStringOption((args) => args.setName("username").setDescription("The player's username you want to move at")),

  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const mcClient = interaction.client.botUsers.get(interaction.user.id);
    let coords = interaction.options.getString("xyz");
    const username = interaction.options.getString("username");
    interaction.deferReply({ ephemeral: true });

    let PlayerCoords = false;

    if (!mcClient) {
      return interaction.editReply({
        embeds: [new EmbedBuilder().setTitle("No bot running !").setColor([255, 0, 0])],
      });
    }

    //Interaction response delay deferred
    console.info("Interaction response delay deferred");
    await interaction.deferReply({ ephemeral: true });

    if (!coords && !username) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("You have to use at least one of the parameter !")
            .setDescription("```\nxyz : The X Y Z coordinates you want the bot to move to (e.g. 3123 67 189\nusername : A player username you want the bot to move to")
            .setColor([255, 0, 0]),
        ],
      });
    } else if (!coords && !mcClient.players[username]) {
      return interaction.editReply({
        embeds: [new EmbedBuilder().setTitle(`I don't see ${username} !`).setColor([255, 0, 0])],
      });
    } else if (!coords && mcClient.players[username]) {
      coords = mcClient.players[username].entity.position.toArray();
      PlayerCoords = true;
    }

    if (PlayerCoords) {
      coords = coords.map((value) => {
        return parseInt(value);
      });
    } else {
      coords = coords.split(/[,\s]+/).filter((value) => value);
      coords = coords.map((value) => {
        return parseInt(value);
      });

      if (!coords.length === 3) {
        return interaction.editReply({
          embeds: [new EmbedBuilder().setTitle("Invalid coordinates were given !").setDescription("```\nX Y Z \ne.g. 100,60,100 or 100 60 100").setColor([255, 0, 0])],
        });
      }
    }

    interaction.editReply({
      embeds: [new EmbedBuilder().setTitle(`${mcClient.username} is on his way to ${coords.join(" ")}`).setColor("NotQuiteBlack")],
    });

    updateGoal(mcClient, coords);
  },
};
