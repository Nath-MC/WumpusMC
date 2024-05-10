const mineflayer = require("mineflayer");

module.exports = {
  name: "physicsTick",

  /**
   *
   * @param {mineflayer.Bot} client
   */
  execute(client) {
    const nearestEntity = client.nearestEntity(
      (e) =>
        !["orb", "global", "other", "object", "projectile"].includes(
          e.type
        ) &&
        e.displayName !== "Armor Stand" &&
        e.position.distanceTo(client.player.entity.position) <= 16
    );

    if (!client.pvp.target && !client.pathfinder.goal) {
      if (nearestEntity) {
        client.lookAt(
          nearestEntity.position.offset(0, nearestEntity.height, 0),
          true
        );
      }
    }
  },
};
