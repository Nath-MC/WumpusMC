const mineflayer = require("mineflayer");

module.exports = {
  name: "startedAttacking",

  /**
   *
   * @param {mineflayer.Bot} client
   */
  execute(client) {
    let bestSword = client.inventory
      .items() // Get the bot's items
      .filter((item) => item?.displayName.includes("Sword")) // Only fetch swords
      .sort((a, b) => b.type - a.type)[0]; // Sort and get the best one (highest ID)

    if (bestSword) client.equip(bestSword, "hand");
  },
};
