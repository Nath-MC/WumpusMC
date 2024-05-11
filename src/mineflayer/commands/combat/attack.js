const mineflayer = require("mineflayer");
const { message: reply } = require("../../Client");

module.exports = {
  name: "attack",
  description : "Attack an entity until its death or until $stop attack",
  args: "<\"me\" | \"nearest\" && searchRadius | EntityType | Player's username>",

  /**
   *
   * @param {mineflayer.Bot} client
   * @param {String[]} cmdArgs
   * @param {String[]} eventArgs
   */

  execute(client, cmdArgs, eventArgs) {

    if (cmdArgs[0] === "me") {

      if (client.players[eventArgs[0]].entity) {

        client.pvp.attack(client.players[eventArgs[0]].entity);
        return reply(client, "I'm coming for you !", eventArgs[0]);

      } else return reply(client, "I don't see you !", eventArgs[0]);

    } else if (cmdArgs[0] === "nearest" && cmdArgs[1]) { // $attack nearest [searchRadius]

      let searchRadius = parseInt(cmdArgs[1])

      if (isNaN(searchRadius) || searchRadius < 0) {
        return reply(
          client,
          "Invalid syntax, try using $attack for help.",
          eventArgs[0]
        );
      }

      const target = client.nearestEntity(
        (entity) =>
          ![
            "orb",
            "global",
            "other",
            "object",
            "projectile",
            "player",
          ].includes(entity.type) &&
          entity.displayName !== "Armor Stand" && // Mojang classifies armor stands as mobs for some reason?
          entity.position.distanceTo(client.player.entity.position) <
            searchRadius
      );

      client.pvp.attack(target);

      return reply(
        client,
        `Attacking the nearest mob : ${target?.displayName}`,
        eventArgs[0]
      );

    } else if (
      cmdArgs[0] === client.registry.entitiesByName[cmdArgs[0]]?.name
    ) {

      // Si l'argument est un mob valide
      const target = client.nearestEntity(
        (entity) =>
          entity.name == client.registry.entitiesByName[cmdArgs[0]].name
      ); // On cherche si le mob existe

      if (!target)
        return reply(
          // S'il n'existe pas, on le signale
          client,
          `I don't see any ${cmdArgs[0]} !`, // cmdArgs[0] == client.registry.entitiesByName[cmdArgs[0]]?.name
          eventArgs[0]
        );

      client.pvp.attack(target); // S'il existe, on l'attaque...

      return reply(
        client,
        `Attacking the nearest ${target.displayName}`,
        eventArgs[0]
      );
    } else if (client.players[cmdArgs[0]]) { // a player ?

      if (client.players[cmdArgs[0]].entity) {

        reply(client, `Attacking the player ${cmdArgs[0]}`, eventArgs[0]);
        return client.pvp.attack(client.players[cmdArgs[0]].entity);

      } else return reply(client, `I don't see ${cmdArgs[0]}`, eventArgs[0]);

    } else {
      //We assume that wrong arguments were used
      return reply(
        client,
        "Invalid syntax, try using $attack for help.",
        eventArgs[0]
      );
    }
  },
};
