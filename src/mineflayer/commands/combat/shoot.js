const mineflayer = require("mineflayer");
const { message : reply } = require("../../Client");

module.exports = {
    name : 'shoot',
    description: 'Shoots arrows at the specified entity.',
    args: "<\"me\">",

    /**
     * 
     * @param {mineflayer.Bot} client 
     * @param {String[]} cmdArgs 
     * @param {String[]} eventArgs 
     */
    execute(client, cmdArgs, eventArgs) {
        if (cmdArgs[0] === client.username) {
            return client.utils.message(client, "You can't do that !", eventArgs[0]);
        }

        else if (cmdArgs[0] === "me") {
            let playerEntity = client.players[eventArgs[0]].entity;

            if (playerEntity) {
                if (client.player.entity.position.distanceTo(playerEntity.position) < 120) {
                    client.hawkEye.autoAttack(playerEntity, cmdArgs[1]); //Faudra rendre ça plus "modular" par exemple? genre récuperer le projectile voulu et si nan bah arc par défaut
                    return client.utils.message(client, "Arrows are raining on you !", eventArgs[0]);
                } else return client.utils.message(client, "I don't see you !", eventArgs[0])
            }
            
        // } else if (client.players[cmdArgs[0]]) { // If cmdArgs[0] is the username of a player
        //     if(!client.players[cmdArgs[0]].entity) return client.utils.message(client, `I don't see ${cmdArgs[0]}`, eventArgs[0]);
        //     // La logique pour attaquer le joueur
        // } else if (cmdArgs[0] === client.registry.entitiesByName[cmdArgs[0]]?.name) {
        //     // La logique pour attaquer l'entité
        
        } else return reply(
            client,
            "Invalid syntax, try using $shoot for help.",
            eventArgs[0]
          );
    }
}