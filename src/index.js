require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
});

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hey') {
        interaction.reply('Hey!');
    }
    if(interaction.commandName === 'ping') {
        interaction.reply('Pong!');
    }
    if(interaction.commandName === 'meme') {
        try {
            const resposta = await axios.get('https://meme-api.com/gimme/wholesomememes');
            interaction.reply(`Resposta da API: ${resposta.data}`);
        } catch (error) {
            console.error('Erro ao fazer a solicitação à API:', error);
            interaction.reply('Ocorreu um erro ao buscar um MEME.');
        }
    }
    if(interaction.commandName === 'ms') {
        interaction.reply(`Latency is ${Math.abs(Date.now() - interaction.createdTimestamp)}ms. API Latency is ${Math.abs(Math.round(client.ws.ping))}ms`);
    }
});

client.login(process.env.CLIENT_TOKEN);
