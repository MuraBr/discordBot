require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

// module.exports = (client) => {
//     client.registerCommands = async(commandFolders, path) => {
//         client.commandArray = [];
//         for(folder of commandFolders) {
//             const commandFiles = fs.readdirSync(`${path}/${folder}`).filter((file => file.endsWith('.js')));
//             for(const file of commandFiles) {
//                 const command = require
//             }
//         }
//     }
// }

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey',
    },
    {
        name: 'ping',
        description: 'Replies with pong',
    },
    {
        name: 'meme',
        description: 'Replies with a meme',
    },
];
const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async () => {
    try {
        console.log("Registering slash comments");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
            { body: commands }
        );

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();