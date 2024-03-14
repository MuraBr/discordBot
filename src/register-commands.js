require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

let deleta = false;

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
const rest = new REST().setToken(process.env.CLIENT_TOKEN);
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
    {
        name: 'ms',
        description: 'Return ping in milliseconds'
    },
];

const slashRegister = async () => {
    try {
        console.log("Registering slash comments");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
            { body: commands }
        );

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
if(deleta == false) slashRegister();
if(deleta == true)
{
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
        .then(() => console.log('Successfully deleted all guild commands.'))
        .catch(console.error);

    // for global commands
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
}